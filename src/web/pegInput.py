import os

""" WELCOME TO THE INPUT VERSION OF PEGPY! """

# This program can be used to easily generate pegRNA sequences suitable for Prime Editing (see Anzalone et al 2019)

# There will be a range of acceptable primer binding sites (PBS) and reverse transcriptase templates (RT) which you may choose from depending upon your particular needs.
# These components are nescessary for even the most simple prime editing scheme (PE2).

# You may consider a PE3b knockin (KI) strategy, which typically increases effiency of KI. This requires an additional sgRNA (dubbed the PE3b guide).
# This program will tell you whether this approach is feasible given your particular gDNA region and desired edits.
# If so, you can select one of the options (there may be a few) that the program provides.


""" INSTRUCTIONS FOR USE """

### This program is meant to take in 3 lines when prompted on the commandline, containing only the following:

# The first should be the wildtype sequence with parentheses surrounding the edits you'd like to make
# The second should be the sequence of the mutation (put exclamation mark (!) if it's a deletion)
# The third should be the sequence of the spacer you've chosen.


### All sequences should be copied in as 5' to 3'.
### The program is not case sensitive.
### If you see any "N" s in the output, copy in a longer sequence


""" EXAMPLE: insertion of agcgta """

# ATGCGCTATGGCGATGCTGATATGCGCTATCGA()TTTGCTGATATGCGCTATCGGAGATGCTGAT
# agcgta
# GATGCTGATATGCGCTATCG

""" EXAMPLE: point mutation (t->g) """

# ATGCGCTATGGCGATGCTGATATGCGCTATCGAT(t)TGCTGATATGCGCTATCGGAGATGCTGAT
# g
# GATGCTGATATGCGCTATCG

""" EXAMPLE: deletion of TATCGA """

# ATGCGCTATGGCGATGCTGATATGCGC(tatcga)TTTGCTGATATGCGCTATCGGAGATGCTGAT
#
# GATGCTGATATGCGCTATCG


""" Go forth and edit! """
""" ~ MS (with technical assistance from NK and direction from RR) """


# function for creating the reverse compliment strand
def revComp(seq):
    compliment = ""
    compMap = {"A": "T", "T": "A", "C": "G", "G": "C", "(": ")", ")": "("}
    for base in seq:
        if base in compMap:
            compliment += compMap[base]
        else:
            compliment += base

    return compliment[::-1]


# function calculating G/C content
def gcContent(seq):
    gc = seq.count("C") + seq.count("G")
    gcPercent = 100 * (float(gc) / len(seq))
    return int(round(gcPercent))


# Calculate melting temperature (Tm) (formula from http://insilico.ehu.es/tm.php?formula=basic)
def tm(seq):
    gc = seq.count("C") + seq.count("G")
    at = seq.count("A") + seq.count("T")
    tm = 0
    if len(seq) < 14:
        tm = (at * 2) + (gc * 4)
    else:
        tm = 64.9 + 41 * (gc - 16.4) / (gc + at)
    tm = round(tm, 1)
    return tm


# create reverse transcriptase template options
def createRT(mutSeq, mut, cut):
    lengthMap = {5: 9, 10: 12, 15: 15, 25: 20}
    relevantOptions = range(0, 25)
    for length, num in lengthMap.items():
        if len(mut) <= length:
            relevantOptions = range(0, num)
            break

    rtInfo = []
    for i in relevantOptions:
        rt = revComp(mutSeq[cut : (cut + len(mut) + 8 + i)])
        info = {
            "flap length": i + 8,
            "rt": clean_sequence(rt),
            "flapGC": gcContent(rt),
            "rtTM": tm(rt),
            "startsWithC": rt[0] == "C",
            "rtPolyT": rt.find("TTTT") >= 0 or rt.find("AAAA") >= 0,
        }
        rtInfo.append(info)

    return rtInfo


# create primer binding site options
def createPBS(mutSeq, cut):
    pbsInfo = []
    for i in range(0, 10):
        pbs = revComp(mutSeq[(cut - 8 - i) : cut])
        info = {
            "length": i + 8,
            "pbs": pbs,
            "pbsGC": gcContent(pbs),
            "pbsTM": tm(pbs),
            "pbsPolyT": pbs.find("TTTT") >= 0 or pbs.find("AAAA") >= 0,
        }
        pbsInfo.append(info)

    return pbsInfo


# Create the PE3 and PE3b guides
def createPE3(wtSeq, mutSeq, cut):
    PE3B_TEST_LENGTH = 17
    rcMutSeq = revComp(mutSeq)
    rcWtSeq = revComp(wtSeq)
    pe3Info = []
    for i in range(0, len(rcMutSeq)):
        if rcMutSeq[i] == "G" and rcMutSeq[i - 1] == "G":
            testSeq = rcMutSeq[i - PE3B_TEST_LENGTH : i + 1]
            info = {
                "pamStart": i,
                "secondGuide": rcMutSeq[i - 22 : i - 2],
                "rcSecondGuide": revComp(rcMutSeq[i - 22 : i - 2]),
                "type": "pe3b" if rcWtSeq.find(testSeq) < 0 else "pe3",
                "cutDiff": i - 6 - cut,
            }
            pe3Info.append(info)

    return pe3Info


def find_deletion_range(sequence):
    "Identify insertion and/or deletion"
    [delStart, delStop] = [sequence.find("("), sequence.find(")")]
    return delStop, delStop


def find_deletion(sequence):
    "find the deletion sequence"
    [delStart, delStop] = find_deletion_range(sequence)
    return sequence[delStart + 1 : delStop]


def create_mutSeq(wtSeq, mut):
    "Create mutant sequence by removing any deletions and adding any insertions"
    [delStart, delStop] = find_deletion_range(wtSeq)
    mutSeq = wtSeq[0:delStart] + mut + wtSeq[delStop + 1 : len(wtSeq)]
    return clean_sequence(mutSeq)


def clean_sequence(wtSeq):
    "Remove parentheses from user input wt sequence"
    return wtSeq.translate({ord(i): None for i in "()"})


def find_spacer_cut(sequence, spacer):
    "find the cut site given the spacer"
    return sequence.find(spacer)


def is_top_strand(sequence, spacer):
    cut = find_spacer_cut(sequence, spacer)
    if find_spacer_cut(sequence, spacer) > 0:
        return True
    if find_spacer_cut(revComp(sequence), spacer) > 0:
        return False
    raise ValueError("Spacer sequence not found")


def flip_strand_if_needed(sequence, spacer):
    "flip the strand if it is a bottom strand match based on the spacer"
    return sequence if is_top_strand(sequence, spacer) else revComp(sequence)


def find_cas9_cut(sequence, spacer):
    """Cas9 cuts 3 positions from the 3' end of the spacer. adjust the cut
    position into the spacer"""
    cut = find_spacer_cut(sequence, spacer)
    return cut + len(spacer) - 3


def ensure_5_prime_cut(cut, delStart):
    "ensure that the cut site is 5' of the mutation"
    if cut > delStart:
        raise ValueError(
            "The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again."
        )


############################################################
# Program logic
############################################################
def main(wtSeq: str, mut: str, spacer: str):
    output = []

    wtSeq = flip_strand_if_needed(wtSeq, spacer)
    deletion = find_deletion(wtSeq)
    [delStart, _] = find_deletion_range(wtSeq)
    mutSeq = create_mutSeq(wtSeq, mut)
    wtFinal = clean_sequence(wtSeq)
    cut = find_cas9_cut(wtFinal, spacer)
    ensure_5_prime_cut(cut, delStart)

    isTopStrand = is_top_strand(wtFinal, spacer)

    # Create components of pegRNA
    rtInfo = createRT(mutSeq, mut, cut)
    pbsInfo = createPBS(mutSeq, cut)
    pe3Info = createPE3(wtSeq, mutSeq, cut)

    #########################################################################################
    # Print Section
    #########################################################################################
    output.append("")
    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )

    output.append(f"Insertion detected:{mut} ( Insertion length: {len(mut)})")
    output.append(f"Deletion detected:{deletion} ( Deletion length: {len(deletion)})")
    output.append("")
    if isTopStrand:
        output.append("Spacer matches on top strand.")
        output.append(
            f"Cut site in wildtype seq:{wtSeq[0:cut]}|{wtSeq[cut : len(wtSeq)]}"
        )
        output.append(
            f"     Cut site in mut seq:{mutSeq[0:cut]}|{mutSeq[cut : len(mutSeq)]}"
        )
    else:
        output.append("Spacer matches bottom strand.")
        output.append(
            f"Cut site in wildtype seq:{wtSeq[0 : len(wtSeq) - cut]}|{wtSeq[len(wtSeq) - cut : len(wtSeq)]}"
        )
        output.append(
            f"     Cut site in mut seq:{mutSeq[0 : len(mutSeq) - cut]}|{mutSeq[len(mutSeq) - cut : len(mutSeq)]}"
        )
    output.append("")
    output.append("    Mutated DNA sequence:{mutSeq}")
    output.append("")
    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )
    output.append("Reverse transcriptase templates*:")
    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )
    rtPoly = False
    for o in rtInfo:
        if o["startsWithC"] == False:
            output.append(
                f"{o['rt']} ( Flap length:{o['flap length']}  Flap G/C content:{o['flapGC']})"
            )
            if o["rtPolyT"] == True:
                rtPoly = True
    output.append(
        '*In RT, "flap" refers to the NT of the edited strand that hybridize to the un-edited strand.'
    )
    output.append("")

    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )
    output.append("Primer binding sites:")
    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )
    pbsPoly = False
    for o in pbsInfo:
        output.append(
            f"{o['pbs']}( Length:{o['length']} G/C content:{o['pbsGC']} Tm:{o['pbsTM']})"
        )
        if o["pbsPolyT"] == True:
            pbsPoly = True
    output.append("")

    if pe3Info == []:
        output.append(
            "There are no PAM sites in your whole sequence on the mutant strand! No PE3 or PE3b will be possible"
        )
    else:
        pe3 = []
        pe3b = []
        for o in pe3Info:
            if o["type"] == "pe3":
                pe3.append(o)
            elif o["type"] == "pe3b":
                pe3b.append(o)

        if pe3 == []:
            output.append("There are no PE3 guides.")
        else:
            output.append(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            )
            output.append("PE3 guides:")
            output.append(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            )
            for o in pe3:
                if o["pamStart"] >= 23:
                    output.append(
                        f"{o['secondGuide']}( PAM index:{o['pamStart']} Distance from spacer:{o['cutDiff']})"
                    )
        output.append("")

        if pe3b == []:
            output.append("There are no PE3b guides.")
            output.append(
                "If you'd like to use a PE3b strategy, you may be able to add a silent mutation which adds a PAM site in the region spanned by the RT"
            )
        else:
            output.append(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            )
            output.append("PE3b guides:")
            output.append(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            )

            for o in pe3b:
                if o["pamStart"] >= 23:
                    output.append(f"{o['secondGuide']}( PAM index:{o['pamStart']})")
        output.append("")

    output.append("")
    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )
    output.append("Warnings and other info:")
    output.append(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    )

    output.append("")
    output.append("SPACER")
    if delStart == cut:
        output.append("Note: Spacer cuts at the mutation site. Nice!")
    else:
        output.append("Note: Spacer cuts 5' of mutation site. Nice!")

    # spacer works for PE built upon Cas9(wt)
    wrongPAM = False
    if len(spacer) == 20 and cut + 5 == "G" and cut + 6 == "G":
        output.append(
            "Note: Spacer is the correct length and has a PAM site compatible with the standard PE enzyme built upon SpCas9. Nice!"
        )
    if len(spacer) != 20:
        output.append(
            "Warning: Spacer is not the correct length for the standard PE enzyme built upon SpCas9."
        )
    if cut + 6 != "G" or cut + 6 != "G":
        wrongPAM = True
        output.append(
            "Warning: Spacer has an incorrect PAM site for the standard PE enzyme built upon SpCas9."
        )

    # cut is close enough for efficient editing
    FAR = 8
    if len(wtSeq[cut:delStart]) > FAR:
        output.append(
            "Warning: The cut site of your spacer is far from the edited region. This may reduce editing efficiency."
        )
    else:
        output.append(
            "Note: The cut site of your spacer is close enough to the edited region for high efficiency editing. Nice!"
        )

    # spacer can't re-cut DNA after correct editing has occurred
    if wrongPAM == False:
        reCut = mutSeq.find(spacer)
        if reCut > 0 and cut + 5 == "G" and cut + 6 == "G":
            output.append(
                "Warning: Your spacer will still be able to cut your DNA after correct edits have been made. This may have deleterious effects."
            )
        else:
            output.append(
                "Note: Once your DNA has been edited, your spacer will not be able to cut it again. Nice! This may help reduce indels."
            )

    output.append("")
    output.append("PBS and RT")

    # Poly-T tracks are bad for pegRNA expression
    if pbsPoly == True:
        output.append(
            "Warning: Poly-T tracks of length 4 or more were found in PBS option(s), and may reduce pegRNA expression."
        )
    if rtPoly == True:
        output.append(
            "Warning: Poly-T tracks of length 4 or more were found in RT option(s), and may reduce pegRNA expression."
        )
    if pbsPoly == False and rtPoly == False:
        output.append("Note: No poly-T tracks detected in RT or PBS. Nice!")

    # RTs that end with C are NOT recommended (see Anzalone, 2019)
    rtBad = False
    for o in rtInfo:
        if o["startsWithC"] == True:
            rtBad = True
            break
    if rtBad == True:
        output.append(
            "Reverse transcriptase templates which are NOT RECOMMENDED because the 5' end is a C:"
        )
        for o in rtInfo:
            if o["startsWithC"] == True:
                output.append(o["rt"])
    output.append("")
    return os.linesep.join(output)
