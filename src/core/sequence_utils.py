import re

from Bio.Seq import Seq
from Bio.SeqUtils import MeltingTemp as mt

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


def revComp(seq):
    "create the reverse complement strand"
    complement = ""
    for base in seq:
        if base in COMPLEMENT_MAP:
            complement += COMPLEMENT_MAP[base]
        else:
            complement += base
    return complement[::-1]


def ntToRegex(seq):
    "exchange ambiguous nt letters for IUPAC equivalent as RE"
    expression = ""
    for base in seq:
        if base in AMBIGUOUS_BASES:
            expression += AMBIGUOUS_BASES[base]
        else:
            expression += base
    return rf"(?=({expression}))"


def gcContent(seq):
    "calculate G/C content of sequence"
    gc = seq.count("C") + seq.count("G")
    print(f"seq: {seq}")
    gcPercent = 100 * (float(gc) / len(seq))
    return int(round(gcPercent))


#######################TODO: figure out which calculation to use ###################
def tm(seq):
    "calculate melting temperature of sequence"
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
def createRT(mutSeq, mut, cut):
    "create reverse transcriptase template options"
    lengthMap = {5: 9, 10: 15, 15: 20, 25: 30}
    relevantOptions = range(0, 25)
    for length, num in lengthMap.items():
        if len(mut) <= length:
            relevantOptions = range(0, num)
            break
    #####################TODO: isDefault######################
    rtInfo = []
    for i in relevantOptions:
        rt = revComp(mutSeq[cut : (cut + len(mut) + 8 + i)])
        info = {
            "flapLength": i + 8,
            "rt": rt,
            "isDefault": False,
            "flapGC": gcContent(rt),
            "rtTM": tm(rt),
            "startsWithC": rt[0] == "C",
            "rtPolyT": rt.find("TTTT") >= 0 or rt.find("AAAA") >= 0,
        }
        rtInfo.append(info)

    return rtInfo


def createPBS(mutSeq, cut, pbsRange):
    "create primer binding site options"
    pbsInfo = []
    for i in range(pbsRange["start"], pbsRange["stop"]):
        pbs = revComp(mutSeq[(cut - i) : cut])
        if len(pbs) > 1:
            info = {
                "length": i,
                "pbs": pbs,
                "isDefault": len(pbs) == 13,
                "pbsGC": gcContent(pbs),
                "pbsTM": tm(pbs),
                "pbsPolyT": pbs.find("TTTT") >= 0 or pbs.find("AAAA") >= 0,
            }
            pbsInfo.append(info)

    return pbsInfo


def createPE3(wtSeq, mutSeq, pamSeq, cut):
    "create the PE3 and PE3b guides"
    rcMutSeq = revComp(mutSeq)
    rcWtSeq = revComp(wtSeq)
    cut = len(mutSeq) - cut
    pe3Info = []
    pams = re.finditer(ntToRegex(pamSeq), rcMutSeq)
    for match in pams:
        pam = match.group(1)
        i = match.start(1)
        testSeq = rcMutSeq[i - PE3B_TEST_LENGTH : i + len(pamSeq)]
        info = {
            "pamStart": i,
            "cutPE3": i - CUT_TO_PAM_LENGTH,
            "cutDiff": abs(i - CUT_TO_PAM_LENGTH - cut),
            "secondGuide": rcMutSeq[i - GUIDE_LENGTH : i],
            "rcSecondGuide": revComp(rcMutSeq[i - GUIDE_LENGTH : i]),
            "type": "pe3b" if rcWtSeq.find(testSeq) < 0 else "pe3",
        }
        pe3Info.append(info)

    return pe3Info


def checkPam(wtSeq, mutSeq, pamSeq, cut):
    "check that PAM is correct & that it doesn't exist in mutSeq"
    pamCheck = wtSeq[cut + CUT_TO_PAM_LENGTH : cut + CUT_TO_PAM_LENGTH + len(pamSeq)]
    pamCutCheck = wtSeq[cut : cut + CUT_TO_PAM_LENGTH] + pamSeq
    mutCutCheck = mutSeq[cut : cut + CUT_TO_PAM_LENGTH + len(pamSeq)]
    return {
        "wrongSpacer": not re.match(ntToRegex(pamSeq), pamCheck),
        "reCutOccurs": re.match(ntToRegex(pamCutCheck), mutCutCheck),
    }


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
