
import os
import re
import sys
import argparse
from types import SimpleNamespace

from Bio.Seq import Seq
from Bio.SeqUtils import MeltingTemp as mt

# Input Defaults
DEFAULT_PAM = "NGG"
DEFAULT_PBS_RANGE = {"start": 8, "stop": 18}
DEFAULT_RT_RANGE = {"start": 0, "stop": 0}
# Constants
CUT_TO_PAM_LENGTH = 3
GUIDE_LENGTH = 20
PE3B_TEST_LENGTH = GUIDE_LENGTH - 4
TOO_FAR_FROM_CUT = 30
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


#######################TODO: figure out which calculation to use ###################
# Calculate melting temperature (Tm)
def tm(seq):
    return mt.Tm_Wallace(Seq(seq))
    # gc = seq.count("C") + seq.count("G")
    # at = seq.count("A") + seq.count("T")
    # tm = 0
    # if len(seq) < 14:
    #     tm = (at * 2) + (gc * 4)
    # else:
    #     tm = 64.9 + 41 * (gc - 16.4) / (gc + at)
    # tm = round(tm, 1)
    # return tm


############################## TODO: add 5 and take out key thing ####################################
# Create reverse transcriptase template options
def createRT(mutSeq, mut, cut):
    lengthMap = {
        5: 9,
        10: 15,
        15: 20,
        25: 30,
    }
    relevantOptions = range(0, 25)
    for length, num in lengthMap.items():
        if len(mut) <= length:
            relevantOptions = range(0, num)
            break
#####################TODO: isDefault######################
    rtInfo = []
    for i in relevantOptions:
        rt = revComp(mutSeq[cut: (cut + len(mut) + 8 + i)])
        info = {
            "flapLength": i + 8,
            "rt": rt,
            "isDefault": False,
            "flapGC": gcContent(rt),
            "rtTM": tm(rt),
            "startsWithC": rt[0] == "C",
            "rtPolyT": rt.find("TTTT") >= 0 or rt.find("AAAA") >= 0
        }
        rtInfo.append(info)

    return rtInfo


# Create primer binding site options
def createPBS(mutSeq, cut, pbsRange):
    pbsInfo = []
    for i in range(pbsRange["start"], pbsRange["stop"]):
        pbs = revComp(mutSeq[(cut - i): cut])
        info = {
            "length": i,
            "pbs": pbs,
            "isDefault": len(pbs) == 13,
            "pbsGC": gcContent(pbs),
            "pbsTM": tm(pbs),
            "pbsPolyT": pbs.find("TTTT") >= 0 or pbs.find("AAAA") >= 0
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


############################################################
# Program logic
############################################################
def main(inputs):
    # Put in sequences
    wtSeq = inputs["wildtype"].upper()
    mut = inputs["mutation"].upper()
    spacer = inputs["spacer"].upper()
    # Advanced
    pamSeq = inputs["pam"].upper()
    pbsRange = inputs["pbsRange"]

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
            return {errors: ["Spacer sequence not found"]}

    cut += len(spacer) - CUT_TO_PAM_LENGTH
    wtSeq = wtFinal

    # Ensure that the cut site is 5' of the mutation
    if cut > delStart:
        print("ERROR: The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again.")
        return {errors: ["The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again."]}

    # Create components of pegRNA
    rtInfo = createRT(mutSeq, mut, cut)
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
    if len(wtSeq[cut:delStart]) > TOO_FAR_FROM_CUT:
        warnings.general.append(
            "The cut site of your spacer is far from the edited region. This may reduce editing efficiency.")

    # PE3 warnings
    if pe3Info == []:
        warnings["pe3"].append("No PAM sites on mutant strand! Try inputting a longer strech of wildytpe sequence.")
    if len(list(filter(lambda o: o["type"] == "pe3", pe3Info))) == 0:
        warnings["pe3"].append("There are no PE3 guides. Try inputting a longer strech of wildytpe sequence.")
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


def writeCsvFile(values):
    outputFile = "OUTPUT.csv"
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
    writeLine("Flap Length", "Flap G/C content", "RT sequence")
    for o in values["reverseTranscriptaseTemplates"]:
        if o["startsWithC"] == False:
            writeLine(str(o["flapLength"]), str(o["flapGC"]), o["rt"])
    writeLine()

    # PBS table
    writeLine("Primer binding sites")
    writeLine("Length", "G/C content", "Tm", "Default", "PBS sequence")
    for o in values["primerBindingSites"]:
        writeLine(str(o["length"]), str(o["pbsGC"]), str(o["pbsTM"]), ("Yes" if o["isDefault"] else ""), o["pbs"])
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
        parser.add_argument('--wildtype', help='The wildtype of the blah')
        parser.add_argument('--mutation', help='The wildtype of the blah')
        parser.add_argument('--spacer', help='The wildtype of the blah')
        parser.add_argument('--pam', help='The wildtype of the blah')
        parser.add_argument('--pbsrange', nargs=2, help='The wildtype of the blah')
        parser.add_argument('--rtrange', nargs=2, help='The wildtype of the blah')
        args = parser.parse_args()
    else:
        # Progressive input
        args["wildtype"] = input("Please input your wildtype sequence: ").upper()
        args["mutation"] = input("Please input your mutation sequence. For deletion, leave blank: ").upper()
        args["spacer"] = input("Please input your spacer sequence: ").upper()
        args["pam"] = input("Please input your PAM (NGG is default): ").upper()
        pbsRangeStart = input("Enter PBS start (" + str(DEFAULT_PBS_RANGE["start"]) + " is default): ").upper()
        pbsRangeStop = input("Enter PBS stop (" + str(DEFAULT_PBS_RANGE["stop"]) + " is default): ").upper()
        args["pbsrange"] = [pbsRangeStart, pbsRangeStop]
        rtRangeStart = input("Enter RT start (" + str(DEFAULT_RT_RANGE["start"]) + " is default): ").upper()
        rtRangeStop = input("Enter RT stop (" + str(DEFAULT_RT_RANGE["start"]) + " is default): ").upper()
        ###
        args["rtrange"] = [rtRangeStart, rtRangeStop]
        args = SimpleNamespace(**args)

    # Input object
    inputs = {
        # "CACAACTCACTTAGCAAAGCTGCCCGCCGCCTCAGCCTAATGTTACACGGCCTTGTGACCCCTAGCCTCCCTGGG(AAAAAAAAAAA)CCCTAGCCATTTAAAGAGGGATGAGGTGATGCTGAAGGCCAGTTGGCA",
        "wildtype": args.wildtype,
        "mutation": args.mutation,  # "ggctcacgtttggaagaggaactgagacgccgcttaactgaa",
        "spacer": args.spacer,  # "CATCCCTCTTTAAATGGCTA",
        # Advanced
        "pam": args.pam if args.pam else "NGG",
        "pbsRange": {"start": args.pbsrange[0], "stop": args.pbsrange[1]} if args.pbsrange and '' not in args.pbsrange else DEFAULT_PBS_RANGE,
        "rtRange": {"start": args.rtrange[0], "stop": args.rtrange[1]} if args.rtrange and '' not in args.rtrange else DEFAULT_RT_RANGE,
    }

    values = main(inputs)
    writeCsvFile(values)


'''
    #########################################################################################
    # Print Section
    #########################################################################################

    # Adjust values for printing
    if isTopStrand == False:
        mutSeq = revComp(mutSeq)
        mut = revComp(mut)
        deletion = revComp(deletion)
        wtSeq = revComp(wtSeq)
    print()
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("Insertion detected:", mut, "( Insertion length:", len(mut), ")")
    print("Deletion detected:", deletion, "( Deletion length:", len(deletion), ")")
    print()
    if isTopStrand:
        print("Spacer matches on top strand.")
        print("Cut site in wildtype seq:" , wtSeq[0:cut], "|" , wtSeq[cut:len(wtSeq)])
        print("     Cut site in mut seq:" , mutSeq[0 : cut] , "|" , mutSeq[cut: len(mutSeq)])
    else:
        print("Spacer matches bottom strand.")
        print("Cut site in wildtype seq:" , wtSeq[0 : len(wtSeq)-cut] , "|" , wtSeq[len(wtSeq)-cut: len(wtSeq)])
        print("     Cut site in mut seq:" , mutSeq[0 : len(mutSeq)-cut] , "|" , mutSeq[len(mutSeq)-cut: len(mutSeq)])
    print()
    print("           Wt seq final :", wtSeq)
    print("    Mutated DNA sequence:", mutSeq)

    print()
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("Reverse transcriptase templates*:")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    rtPoly = False
    for o in rtInfo:
        if o["startsWithC"] == False:
            print(o["rt"], " ( Flap length:", o["flap length"], "  Flap G/C content:", o["flapGC"], ")")
            if o["rtPolyT"] == True:
                rtPoly = True
    print("*In RT, \"flap\" refers to the nt of the edited strand that hybridize to the un-edited strand.")
    print()

    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("Primer binding sites:")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    pbsPoly = False
    for o in pbsInfo:
        print(o["pbs"], "( Length:", o["length"], " G/C content:", o["pbsGC"], " Tm:", o["pbsTM"], ")")
        if o["pbsPolyT"] == True:
            pbsPoly = True
    print()

    if pe3Info == []:
        print("There are no PAM sites in your whole sequence on the mutant strand! No PE3 or PE3b will be possible")

    else:
        pe3 = []
        pe3b = []
        for o in pe3Info:
            if o["type"] == "pe3":
                pe3.append(o)
            elif o["type"] == "pe3b":
                pe3b.append(o)

        if pe3 == []:
            print("There are no PE3 guides.")
        else:
            print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            print("PE3 guides:")
            print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            for o in pe3:
                if o["pamStart"] >= 23:
                    print(o["secondGuide"], "( Cut index:", o["cutPE3"], " Distance between cut sites:", o["cutDiff"] , ")")
        print()

        if pe3b == []:
            print("There are no PE3b guides.")
            print("If you'd like to use a PE3b strategy, you may be able to add a silent mutation which adds a PAM site in the region spanned by the RT")
        else:
            print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            print("PE3b guides:")
            print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

            for o in pe3b:
                if o["pamStart"] >= 23:
                    print(o["secondGuide"], "( Cut index:", o["cutPE3"], ")")
        print()

    print()
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("Warnings and other info:")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    print()
    print("SPACER")
    if delStart == cut:
        print("Note: Spacer cuts at the mutation site. Nice!")
    else:
        print("Note: Spacer cuts 5' of mutation site. Nice!")


    # spacer works for PE built upon Cas9(wt)
    wrongPAM = False
    if len(spacer) == 20 and wtSeq[cut+5] == "G" and wtSeq[cut+4] == "G":
        print("Note: Spacer is the correct length and has a PAM site compatible with the standard PE enzyme built upon SpCas9. Nice!")
    if len(spacer) != 20:
        print("Warning: Spacer is not the correct length but has a PAM site for the standard PE enzyme built upon SpCas9.")
    if wtSeq[cut+5] != "G" or wtSeq[cut+4] != "G":
        wrongPAM = True
        print("Warning: Spacer has an incorrect PAM site but is correct length for the standard PE enzyme built upon SpCas9.")

    # cut is close enough for efficient editing
    FAR = 30
    if len(wtSeq[cut:delStart]) > FAR:
        print("Warning: The cut site of your spacer is far from the edited region. This may reduce editing efficiency.")

    # spacer can't re-cut DNA after correct editing has occurred
    if wrongPAM == False:
        reCut = mutSeq.find(spacer)
        if reCut > 0 and wtSeq[cut+5] == "G" and wtSeq[cut+4] == "G":
            print("Warning: Your spacer will still be able to cut your DNA after correct edits have been made. This may have deleterious effects.")
        else:
            print("Note: Once your DNA has been edited, your spacer will not be able to cut it again. Nice! This may help reduce indels.")

    print()
    print("PBS and RT")

    # Poly-T tracks are bad for pegRNA expression
    if pbsPoly == True:
        print("Warning: Poly-T tracks of length 4 or more were found in PBS option(s), and may reduce pegRNA expression.")
    if rtPoly == True:
        print("Warning: Poly-T tracks of length 4 or more were found in RT option(s), and may reduce pegRNA expression.")
    if pbsPoly == False and rtPoly == False:
        print("Note: No poly-T tracks detected in RT or PBS. Nice!")

    # RTs that end with C are NOT recommended (see Anzalone, 2019)
    rtBad = False
    for o in rtInfo:
        if o["startsWithC"] == True:
            rtBad = True
            break
    if rtBad == True:
        print("Reverse transcriptase templates which are NOT RECOMMENDED because the 5' end is a C:")
        for o in rtInfo:
            if o["startsWithC"] == True:
                print(o["rt"])
'''
