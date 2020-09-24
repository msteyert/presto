
import os
import re
import sys
import math
import argparse
from types import SimpleNamespace

# Input Defaults
DEFAULT_PAM = "NGG"
DEFAULT_PBS_RANGE = {"start": 8, "stop": 18}
# Constants
CUT_TO_PAM_LENGTH = 3
GUIDE_LENGTH = 20
PE3B_TEST_LENGTH = GUIDE_LENGTH - 4
TOO_FAR_FROM_CUT = 10
COMPLEMENT_MAP = {
    "A": "T",
    "T": "A",
    "C": "G",
    "G": "C",
    "N": "N",
    "Y": "R",
    "R": "Y",
    "W": "W",
    "S": "S",
    "K": "M",
    "M": "K",
    "D": "H",
    "V": "B",
    "H": "D",
    "B": "V",
    "X": "X",
    "-": "-",
    "(": ")",
    ")": "(",
}
AMBIGUOUS_BASES = {
    "N": ".",
    "X": ".",
    "Y": "[C,T]",
    "R": "[A,G]",
    "W": "[A,T]",
    "S": "[C,G]",
    "K": "[G,T]",
    "M": "[A,C]",
    "D": "[A,T,G]",
    "V": "[A,C,G]",
    "H": "[A,T,C]",
    "B": "[C,G,T]",
}


# Function for creating the reverse complement strand
def revComp(seq):
    complement = ""
    for base in seq:
        if base in COMPLEMENT_MAP:
            complement += COMPLEMENT_MAP[base]
        else:
            complement += base
    return complement[::-1]


# Function exchanging ambiguous nt letters for IUPAC equivalent as RE
def ntToRegex(seq):
    expression = ""
    for base in seq:
        if base in AMBIGUOUS_BASES:
            expression += AMBIGUOUS_BASES[base]
        else:
            expression += base
    return rf'(?=({expression}))'


# function calculating G/C content
def gcContent(seq):
    gc = seq.count("C") + seq.count("G")
    gcPercent = 100 * (float(gc) / len(seq))
    return int(round(gcPercent))


# Calculate melting temperature (Tm)
def tm(seq):
    gc = seq.count("C") + seq.count("G")
    at = seq.count("A") + seq.count("T")
    tm = (at * 2) + (gc * 4)
    return tm


# Calculate RT length options
def calcRtRange(mut):
    mutLength = len(mut)
    defaultRange = [9, 16]
    rangeMap = {
        4: [mutLength + 6, mutLength + 16],
        8: [mutLength + 8, mutLength + 22],
        20: [mutLength + 10, mutLength + 30],
    }
    for length, rtRange in rangeMap.items():
        if mutLength > length:
            defaultRange = rtRange
    return {"start": defaultRange[0], "stop": defaultRange[1]}


# Create reverse transcriptase template options
def createRT(mutSeq, mut, cut, delStart, rtRange):
    rtInfo = []
    for i in range(rtRange["start"], rtRange["stop"]):
        rt = revComp(mutSeq[cut: cut + i])
        fhrStart = delStart + len(mut)
        fhrStop = cut + i
        fhrIsValid = fhrStart < fhrStop
        cutIsValid = cut + i < len(mutSeq)
        fhr = mutSeq[fhrStart:fhrStop]
        info = {
            "rtLength": len(rt),
            "rt": rt,
            "isDefault": False,
            "error": (""
                      if cutIsValid and fhrIsValid else "ERROR: " +
                      ("Cut too close to edge of wildtype sequence." if cutIsValid else "") +
                      ("FHR does not exist." if fhrIsValid else "")
                      ),
            "fhr": (fhr if not fhrIsValid else "INVALID"),
            "fhrLength": len(fhr),
            "fhrGC": (gcContent(fhr) if fhrIsValid else 0),
            "rtTM": tm(rt),
            "startsWithC": rt[0] == "C",
            "rtPolyT": (rt.find("TTTT") >= 0 or rt.find("AAAA") >= 0)
        }
        rtInfo.append(info)

    # Set default rt as the closest option to midpoint of rt range which doesn't start with C
    midpoint = math.floor(len(rtInfo)/2)
    for i in range(0, midpoint-1):
        if not rtInfo[midpoint + i]["startsWithC"]:
            rtInfo[midpoint + i]["isDefault"] = True
            break
        if not rtInfo[midpoint - i]["startsWithC"]:
            rtInfo[midpoint - i]["isDefault"] = True
            break

    return rtInfo


# Create primer binding site options
def createPBS(mutSeq, cut, pbsRange):
    pbsInfo = []
    for i in range(pbsRange["start"], pbsRange["stop"]):
        pbs = revComp(mutSeq[(cut - i): cut])
        pbsIsValid = cut - i >= 0
        info = {
            "length": i,
            "pbs": pbs,
            "error": ("" if pbsIsValid else "ERROR: Cut site is too close to 5'"),
            "isDefault": (len(pbs) == 13 if pbsIsValid else False),
            "pbsGC": (gcContent(pbs) if pbsIsValid else 0),
            "pbsTM": (tm(pbs) if pbsIsValid else 0),
            "pbsPolyT": (pbs.find("TTTT") >= 0 or pbs.find("AAAA") >= 0)
        }
        pbsInfo.append(info)

    return pbsInfo


# Create the PE3 and PE3b guides
def createPE3(wtSeq, mutSeq, pamSeq, cut):
    rcMutSeq = revComp(mutSeq)
    rcWtSeq = revComp(wtSeq)
    cut = len(mutSeq) - cut
    pe3Info = []
    pams = re.finditer(ntToRegex(pamSeq), rcMutSeq)
    for match in pams:
        pam = match.group(1)
        i = match.start(1)
        testSeq = rcMutSeq[i - PE3B_TEST_LENGTH: i + len(pamSeq)]
        info = {
            "pamStart": i,
            "cutPE3": i - CUT_TO_PAM_LENGTH,
            "cutDiff": abs(i - CUT_TO_PAM_LENGTH - cut),
            "secondGuide": rcMutSeq[i - GUIDE_LENGTH: i],
            "rcSecondGuide": revComp(rcMutSeq[i - GUIDE_LENGTH: i]),
            "type": "pe3b" if rcWtSeq.find(testSeq) < 0 else "pe3",
        }
        pe3Info.append(info)

    return pe3Info


# Check that PAM is correct & that it doesn't exist in mutSeq
def checkPam(wtSeq, mutSeq, pamSeq, cut):
    pamCheck = wtSeq[cut + CUT_TO_PAM_LENGTH: cut + CUT_TO_PAM_LENGTH + len(pamSeq)]
    pamCutCheck = wtSeq[cut: cut + CUT_TO_PAM_LENGTH] + pamSeq
    mutCutCheck = mutSeq[cut: cut + CUT_TO_PAM_LENGTH + len(pamSeq)]
    return {
        "wrongSpacer": not re.match(ntToRegex(pamSeq), pamCheck),
        "reCutOccurs": re.match(ntToRegex(pamCutCheck), mutCutCheck),
    }


# Program logic
def main(inputs):
    # Put in sequences
    wtSeq = inputs["wildtype"].upper()
    mut = inputs["mutation"].upper()
    spacer = inputs["spacer"].upper()
    # Advanced
    pamSeq = inputs["pam"].upper()
    pbsRange = inputs["pbsRange"]
    rtRange = inputs["rtRange"]

    # Identify insertion and/or deletion
    [delStart, delStop] = [wtSeq.find("("), wtSeq.find(")")]
    deletion = wtSeq[delStart + 1: delStop]
    # Create mutant sequence by removing any deletions and adding any insertions
    mutSeq = wtSeq[0:delStart] + mut + wtSeq[delStop + 1:len(wtSeq)]
    # Remove parentheses from user input wt sequence
    wtFinal = wtSeq[0:delStart] + deletion + wtSeq[delStop + 1:len(wtSeq)]
    cut = wtFinal.find(spacer)

    isTopStrand = True
    if cut < 0:
        # Flip sequence if the spacer is found on the bottom strand
        isTopStrand = False
        wtSeq = revComp(wtSeq)
        mut = revComp(mut)
        [delStart, delStop] = [wtSeq.find("("), wtSeq.find(")")]
        deletion = wtSeq[delStart + 1: delStop]
        mutSeq = wtSeq[0:delStart] + mut + wtSeq[delStop + 1:len(wtSeq)]
        wtFinal = wtSeq[0:delStart] + deletion + wtSeq[delStop + 1:len(wtSeq)]
        cut = wtFinal.find(spacer)
        if cut < 0:
            print("ERROR: Spacer sequence not found")
            return {"errors": ["Spacer sequence not found"]}

    cut += len(spacer) - CUT_TO_PAM_LENGTH
    wtSeq = wtFinal

    # Ensure that the cut site is 5' of the mutation
    if cut > delStart:
        print("ERROR: The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again.")
        return {"errors": ["The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again."]}

    # Create components of pegRNA
    rtInfo = createRT(mutSeq, mut, cut, delStart, rtRange)
    pbsInfo = createPBS(mutSeq, cut, pbsRange)
    pe3Info = createPE3(wtSeq, mutSeq, pamSeq, cut)
    pamInfo = checkPam(wtSeq, mutSeq, pamSeq, cut)

    # Adjust values for printing
    if isTopStrand == False:
        mutSeq = revComp(mutSeq)
        mut = revComp(mut)
        deletion = revComp(deletion)
        wtSeq = revComp(wtSeq)

    # Errors and Warnings
    errors = []
    warnings = {
        "general": [],
        "pegRna": [],
        "pe3": [],
    }

    # Spacer warnings
    if len(spacer) != GUIDE_LENGTH:
        warnings["general"].append("Spacer is not the correct length.")
    if pamInfo["wrongSpacer"]:
        warnings["general"].append("Spacer has an incorrect PAM site.")
    if pamInfo["reCutOccurs"]:
        warnings["general"].append("Spacer will be able to nick mutant DNA. This may have deleterious effects.")

    # Cut is close enough for efficient editing
    if delStart - cut > TOO_FAR_FROM_CUT:
        warnings["general"].append(
            "The cut site of your spacer is far from the edited region. This may reduce editing efficiency.")

    # PE3 warnings
    if pe3Info == []:
        warnings["pe3"].append("No PAM sites on mutant strand! Try using a longer strech of wildytpe sequence.")
    if len(list(filter(lambda o: o["type"] == "pe3", pe3Info))) == 0:
        warnings["pe3"].append("There are no PE3 guides. Try using a longer strech of wildytpe sequence.")
    if len(list(filter(lambda o: o["type"] == "pe3b", pe3Info))) == 0:
        warnings["pe3"].append(
            "There are no PE3b guides. If you'd like to use a PE3b strategy, you may be able to add a silent mutation which adds a PAM site in the region spanned by the RT.")

    # Poly-T tracks are bad for pegRNA expression
    for o in pbsInfo:
        if o["pbsPolyT"] == True:
            warnings["pegRna"].append(
                "Poly-T tracks of length 4 or more were found in PBS option(s), and may reduce pegRNA expression.")
            break
    # RTs that end with C are NOT recommended (see Anzalone, 2019)
    for o in rtInfo:
        if o["startsWithC"] == True:
            warnings["pegRna"].append("RT template is NOT RECOMMENDED because 5' end is a C: " + o["rt"])
    for o in rtInfo:
        if o["rtPolyT"] == True:
            warnings["pegRna"].append(
                "Poly-T tracks of length 4 or more were found in RT option(s), and may reduce pegRNA expression.")
            break

    # Returned values
    return {
        "spacerMatchesOn": "top" if isTopStrand else "bottom",
        "wildtypeSequence": wtSeq,
        "editedSequence": mutSeq,
        "protospacerAdjacentMotif": pamSeq,
        "insertion": mut,
        "deletion": deletion,
        "spacer": spacer,
        "spacerCutIndex": cut,
        "primeEditing3Guides": pe3Info,
        "reverseTranscriptaseTemplates": rtInfo,
        "spacerPamInfo": pamInfo,
        "primerBindingSites": pbsInfo,
        "errors": errors,
        "warnings": warnings,
    }


# Creates CSV file
def writeCsvFile(outputFile, values):
    f = open(outputFile, "w")
    print("CSV file will be written to:", os.getcwd() + "/" + outputFile)

    def writeLine(*columns):
        strings = [str(i) for i in columns]
        f.write(",".join(strings) + "\n")
        print(" ".join(strings))

    # Reiterate inputs
    writeLine("INPUT")
    writeLine("Wildtype sequence", values["wildtypeSequence"])
    writeLine("Mutation", values["insertion"])
    writeLine("Spacer sequence", values["spacer"])
    # Abreviated basic outputs
    writeLine("Spacer matches on", values["spacerMatchesOn"])
    writeLine("Edited DNA sequence", values["editedSequence"])
    writeLine()

    writeLine()
    writeLine("OUTPUT")
    # RT table
    writeLine("Reverse transcriptase templates")
    writeLine("Flap homology region length", "Flap homology region G/C content", "Default", "RT sequence", "Error?")
    for o in values["reverseTranscriptaseTemplates"]:
        if o["startsWithC"] == False:
            writeLine(str(o["fhrLength"]), str(o["fhrGC"]), ("Yes" if o["isDefault"] else ""), o["rt"], o["error"])
    writeLine()

    # PBS table
    writeLine("Primer binding sites")
    writeLine("Length", "G/C content", "Tm", "Default", "PBS sequence", "Error?")
    for o in values["primerBindingSites"]:
        writeLine(
            str(o["length"]),
            str(o["pbsGC"]),
            str(o["pbsTM"]),
            ("Yes" if o["isDefault"] else ""),
            o["pbs"],
            o["error"])
    writeLine()

    # PE3 table
    pe3 = []
    pe3b = []
    for o in values["primeEditing3Guides"]:
        if o["type"] == "pe3":
            pe3.append(o)
        elif o["type"] == "pe3b":
            pe3b.append(o)
    # Print pe3 guides
    if pe3 != []:
        writeLine("PE3 guides")
        writeLine("Cut index", "Distance between spacer and PE3 guide cut sites", "PE3 guide")
        for o in pe3:
            if o["pamStart"] >= GUIDE_LENGTH + CUT_TO_PAM_LENGTH:
                writeLine(o["cutPE3"], o["cutDiff"], o["secondGuide"])
    writeLine()
    # Print pe3b guides
    if pe3b != []:
        writeLine("PE3b guides")
        writeLine("Cut index", "PE3b guide")
        for o in pe3b:
            if o["pamStart"] >= GUIDE_LENGTH + CUT_TO_PAM_LENGTH:
                writeLine(o["cutPE3"], o["secondGuide"])
    writeLine()

    # Print general warnings
    if len(values["warnings"]["general"]) > 0:
        writeLine()
        writeLine("General warnings:")
        for warning in values["warnings"]["general"]:
            writeLine("", warning)

    # Print pe3 warnings
    if len(values["warnings"]["pe3"]) > 0:
        writeLine()
        writeLine("PE3/b warnings:")
        for warning in values["warnings"]["pe3"]:
            writeLine("", warning)

    # Print peg warnings
    if len(values["warnings"]["pegRna"]) > 0:
        writeLine()
        writeLine("pegRNA warnings:")
        for warning in values["warnings"]["pegRna"]:
            writeLine("", warning)

    f.close()


if __name__ == "__main__":
    args = {}
    if (len(sys.argv) > 1):
        # Command line input
        parser = argparse.ArgumentParser()
        parser.add_argument('--wildtype', help='Wildtype sequence with parenthases at/around mutation site')
        parser.add_argument('--mutation', help='Additions (leave blank if performing deletion)')
        parser.add_argument('--spacer', help='Sequence of spacer')
        parser.add_argument('--pam', help='PAM sequence (use IUPAC ambiguity as needed')
        parser.add_argument('--pbsrange', nargs=2,
                            help='Min and max PBS lengths (to override defaults (8-18), specify both values)')
        parser.add_argument(
            '--rtrange', nargs=2,
            help='Min and max RT lengths (to override defaults, specify both values - defaults depend on length of mutation)')
        parser.add_argument('--file', help='The name of the csv file to output to')
        args = parser.parse_args()
    else:
        # Progressive input
        args["wildtype"] = input("Please input your wildtype sequence: ").upper()
        args["mutation"] = input("Please input your mutation sequence. For deletion, leave blank: ").upper()
        args["spacer"] = input("Please input your spacer sequence: ").upper()
        args["pam"] = input("Please input your PAM (NGG is default): ").upper()
        pbsRangeStart = input("Enter PBS start (" + str(DEFAULT_PBS_RANGE["start"]) + " is default): ")
        pbsRangeStop = input("Enter PBS stop (" + str(DEFAULT_PBS_RANGE["stop"]) + " is default): ")
        args["pbsrange"] = [pbsRangeStart, pbsRangeStop]
        defaultRtRange = calcRtRange(args["mutation"])
        rtRangeStart = input("Enter RT start (" + str(defaultRtRange["start"]) + " is default): ")
        rtRangeStop = input("Enter RT stop (" + str(defaultRtRange["stop"]) + " is default): ")
        args["rtrange"] = [rtRangeStart, rtRangeStop]
        args = SimpleNamespace(**args)

    # Input object
    inputs = {
        "wildtype": args.wildtype,
        "mutation": args.mutation if args.mutation else "",
        "spacer": args.spacer,
        # Advanced
        "pam": args.pam if args.pam else "NGG",
        "pbsRange": {"start": int(args.pbsrange[0]), "stop": int(args.pbsrange[1])} if args.pbsrange and '' not in args.pbsrange else DEFAULT_PBS_RANGE,
        "rtRange": {"start": int(args.rtrange[0]), "stop": int(args.rtrange[1])} if args.rtrange and '' not in args.rtrange else calcRtRange(args.mutation if args.mutation else ""),
    }

    values = main(inputs)
    writeCsvFile(args.file if args.file else "presto_output.csv", values)
