from math import ceil, floor
import re
import math
from typing import Sequence

from .models import PegInput

# Input Defaults
DEFAULT_PAM = "NGG"
DEFAULT_PBS_RANGE = {"start": 8, "stop": 18}
# Constants
CUT_TO_PAM_LENGTH = 3
SPACER_END_TO_CUT = 3
GUIDE_LENGTH = 20
GUIDE_TEST_LENGTH = GUIDE_LENGTH - 4
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

FIVE_PRIME_FILLER = "TGAGCAAGGGCGAGGAGGATAACATGGCCATCATCAAGGAGTTCATGCGCTTCAAGGTGCACATGGAGGGCTCCGTGAACGGCGGGTTATTGTCTCATGAGCGG"
THREE_BP_BBSI = "CGGGAAGACCTCACC"
CAS9_SCAFFOLD = "GTTTCAGAGCTATGCTGGAAACAGCATAGCAAGTTGAAATAAGGCTAGTCCGTTATCAACTTGAAAAAGTGGCACCGAGTCGGTGC"
TERM_BBSI_3BP = "TTTTGCCGGTCTTCTAA"
THREE_PRIME_FILLER = (
    "TAATGGTTTCTTAGACGTCACTCTCGTCACCGTCGTGAAGCACCGGCGGCATGGACGAGCTGTACAAG"
)
SENSE_PE3_OVERHANG = "CACC"
ANTISENSE_PE3_OVERHANG = "AAAC"

ANNOTATION_COLORS = [
    "#b3e2cd",
    "#fdcdac",
    "#cbd5e8",
    "#f4cae4",
    "#e6f5c9",
    "#fff2ae",
    "#f1e2cc",
    "#cccccc",
]


def revComp(seq):
    """create the reverse complement strand"""
    complement = ""
    for base in seq:
        if base in COMPLEMENT_MAP:
            complement += COMPLEMENT_MAP[base]
        else:
            complement += base
    return complement[::-1]


def ntToRegex(seq):
    """exchange ambiguous nt letters for IUPAC equivalent as RE"""
    expression = ""
    for base in seq:
        if base in AMBIGUOUS_BASES:
            expression += AMBIGUOUS_BASES[base]
        else:
            expression += base
    return rf"(?=({expression}))"


def gcContent(seq):
    """calculate G/C content of sequence"""
    gc = seq.count("C") + seq.count("G")
    gcPercent = 100 * (float(gc) / len(seq))
    return int(round(gcPercent))


def tm(seq):
    """calculate melting temperature of sequence"""
    gc = seq.count("C") + seq.count("G")
    at = seq.count("A") + seq.count("T")
    tm = (at * 2) + (gc * 4)
    return tm


def calcRtRange(mut):
    """Calculate RT length options"""
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


def createRT(mutSeq, mut, cut, delStart, rtRange):
    """create reverse transcriptase template options"""
    rtInfo = []
    for i in range(rtRange["start"], rtRange["stop"]):
        rt = revComp(mutSeq[cut : cut + i])
        fhrStart = delStart + len(mut)
        fhrStop = cut + i
        fhrIsValid = fhrStart < fhrStop
        cutIsValid = cut + i < len(mutSeq)
        fhr = mutSeq[fhrStart:fhrStop]
        info = {
            "rtLength": len(rt),
            "rt": rt,
            "isDefault": False,
            "error": (
                ""
                if cutIsValid and fhrIsValid
                else "ERROR: "
                + ("Cut too close to edge of wildtype sequence." if cutIsValid else "")
                + ("FHR does not exist." if fhrIsValid else "")
            ),
            "fhr": (fhr if not fhrIsValid else "INVALID"),
            "fhrLength": len(fhr),
            "fhrGC": (gcContent(fhr) if fhrIsValid else 0),
            "rtTM": tm(rt),
            "startsWithC": rt[0] == "C",
            "rtPolyT": (rt.find("TTTT") >= 0 or rt.find("AAAA") >= 0),
        }
        rtInfo.append(info)

    # Set default rt as the closest option to midpoint of rt range which doesn't start with C
    midpoint = math.floor(len(rtInfo) / 2)
    for i in range(0, midpoint - 1):
        if not rtInfo[midpoint + i]["startsWithC"]:
            rtInfo[midpoint + i]["isDefault"] = True
            break
        if not rtInfo[midpoint - i]["startsWithC"]:
            rtInfo[midpoint - i]["isDefault"] = True
            break

    return rtInfo


def createPBS(mutSeq, cut, pbsRange):
    """create primer binding site options"""
    pbsInfo = []
    for i in range(pbsRange["start"], pbsRange["stop"]):
        pbs = revComp(mutSeq[(cut - i) : cut])
        pbsIsValid = cut - i >= 0
        info = {
            "length": i,
            "pbs": pbs,
            "error": ("" if pbsIsValid else "ERROR: Cut site is too close to 5'"),
            "isDefault": (len(pbs) == 13 if pbsIsValid else False),
            "pbsGC": (gcContent(pbs) if pbsIsValid else 0),
            "pbsTM": (tm(pbs) if pbsIsValid else 0),
            "pbsPolyT": (pbs.find("TTTT") >= 0 or pbs.find("AAAA") >= 0),
        }
        pbsInfo.append(info)

    return pbsInfo


def createPE3(wtSeq, mutSeq, pamSeq, cut):
    """create the PE3 and PE3b guides"""
    rcMutSeq = revComp(mutSeq)
    rcWtSeq = revComp(wtSeq)
    cut = len(mutSeq) - cut
    pe3Info = []
    pams = re.finditer(ntToRegex(pamSeq), rcMutSeq)
    for match in pams:
        pam = match.group(1)
        i = match.start(1)
        testSeq = rcMutSeq[i - GUIDE_TEST_LENGTH : i + len(pamSeq)]
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
    """check that PAM is correct & that it doesn't exist in mutSeq"""
    pamCheck = wtSeq[cut + CUT_TO_PAM_LENGTH : cut + CUT_TO_PAM_LENGTH + len(pamSeq)]
    pamCutCheck = wtSeq[cut : cut + CUT_TO_PAM_LENGTH] + pamSeq
    mutCutCheck = mutSeq[cut : cut + CUT_TO_PAM_LENGTH + len(pamSeq)]
    return {
        "wrongSpacer": not re.match(ntToRegex(pamSeq), pamCheck),
        "reCutOccurs": re.match(ntToRegex(pamCutCheck), mutCutCheck),
    }


def find_deletion_range(sequence):
    """Identify insertion and/or deletion"""
    [delStart, delStop] = [sequence.find("("), sequence.find(")")]
    return delStart, delStop


def find_deletion(sequence):
    """find the deletion sequence"""
    [delStart, delStop] = find_deletion_range(sequence)
    return sequence[delStart + 1 : delStop]


def create_mutSeq(wtSeq, mut):
    """Create mutant sequence by removing any deletions and adding any insertions"""
    [delStart, delStop] = find_deletion_range(wtSeq)
    mutSeq = wtSeq[0:delStart] + mut + wtSeq[delStop + 1 : len(wtSeq)]
    return clean_sequence(mutSeq)


def clean_sequence(wtSeq):
    """Remove parentheses from user input wt sequence"""
    return wtSeq.translate({ord(i): None for i in "()"})


def create_final_wtSeq(wtSeq):
    [delStart, delStop] = find_deletion_range(wtSeq)
    deletion = find_deletion(wtSeq)
    return wtSeq[0:delStart] + deletion + wtSeq[delStop + 1 : len(wtSeq)]


def find_spacer_cut(sequence, spacer):
    """find the cut site given the spacer"""
    return sequence.find(spacer)


def is_top_strand(sequence, spacer):
    final_sequence = create_final_wtSeq(sequence)
    if find_spacer_cut(final_sequence, spacer) > 0:
        return True
    if find_spacer_cut(revComp(final_sequence), spacer) > 0:
        return False
    raise ValueError("Spacer sequence not found")


def flip_strand_if_needed(sequence, spacer):
    """flip the strand if it is a bottom strand match based on the spacer"""
    return sequence if is_top_strand(sequence, spacer) else revComp(sequence)


def find_cas9_cut(sequence, spacer):
    """Cas9 cuts 3 positions from the 3' end of the spacer. adjust the cut position into the spacer"""
    cut = find_spacer_cut(sequence, spacer)
    return cut + len(spacer) - CUT_TO_PAM_LENGTH


def ensure_5_prime_cut(cut, delStart):
    """ensure that the cut site is 5' of the mutation"""
    if cut > delStart:
        raise ValueError(
            "The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again."
        )


def build_untrimmed_pegRNA(spacer: str, rtt: str, pbs: str):
    """builds the final but untrimmed pegRNA from the given spacer,
    reverse transcriptase template, and primer binding site"""
    return f"{FIVE_PRIME_FILLER}{THREE_BP_BBSI}{spacer}{CAS9_SCAFFOLD}{rtt}{pbs}{TERM_BBSI_3BP}{THREE_PRIME_FILLER}"


def trim_sequence(sequence: str, target_length: int = 300):
    """trims sequence to desired length by symetrically removing bases from the 5' and 3' ends.
    If the sequence is already under the target length, it is returned unchanged. If the sequence
    is an odd number length, the 5 prime end is trimmed down one extra base to reach the
    target length"""
    if len(sequence) <= target_length:
        return {
            "sequence": sequence,
            "five_prime_filler": FIVE_PRIME_FILLER,
            "three_prime_filler": THREE_PRIME_FILLER,
        }
    bases_to_trim = len(sequence) - target_length
    return {
        "sequence": sequence[bases_to_trim:],
        "five_prime_filler": FIVE_PRIME_FILLER[bases_to_trim:],
        "three_prime_filler": THREE_PRIME_FILLER,
    }


def build_final_pegRNA(spacer: str, rtt: str, pbs: str):
    untrimmed = build_untrimmed_pegRNA(spacer=spacer, rtt=rtt, pbs=pbs)
    trimmed = trim_sequence(sequence=untrimmed)
    five_prime_filler_start = 0
    three_bp_bbsi_start = (
        five_prime_filler_start + len(trimmed["five_prime_filler"]) + 1
    )
    spacer_start = three_bp_bbsi_start + len(THREE_BP_BBSI) + 1
    cas9_scaffold_start = spacer_start + len(spacer) + 1
    rtt_start = cas9_scaffold_start + len(CAS9_SCAFFOLD) + 1
    pbs_start = rtt_start + len(rtt) + 1
    term_bbsi_3bp_start = pbs_start + len(pbs) + 1
    three_prime_filler_start = term_bbsi_3bp_start + len(TERM_BBSI_3BP) + 1
    return {
        "sequence": trimmed["sequence"],
        "annotations": [
            {
                "start": five_prime_filler_start,
                "end": three_bp_bbsi_start,
                "color": ANNOTATION_COLORS[0],
                "name": "filler",
                "sequence": trimmed["five_prime_filler"],
            },
            {
                "start": three_bp_bbsi_start,
                "end": spacer_start,
                "color": ANNOTATION_COLORS[1],
                "name": "bbsi",
                "sequence": THREE_BP_BBSI,
            },
            {
                "start": spacer_start,
                "end": cas9_scaffold_start,
                "color": ANNOTATION_COLORS[2],
                "name": "spacer",
                "sequence": spacer,
            },
            {
                "start": cas9_scaffold_start,
                "end": rtt_start,
                "color": ANNOTATION_COLORS[3],
                "name": "cas9_scaffold",
                "sequence": CAS9_SCAFFOLD,
            },
            {
                "start": rtt_start,
                "end": pbs_start,
                "color": ANNOTATION_COLORS[4],
                "name": "rtt",
                "sequence": rtt,
            },
            {
                "start": pbs_start,
                "end": term_bbsi_3bp_start,
                "color": ANNOTATION_COLORS[5],
                "name": "pbs",
                "sequence": pbs,
            },
            {
                "start": term_bbsi_3bp_start,
                "end": three_prime_filler_start,
                "color": ANNOTATION_COLORS[1],
                "name": "bbsi",
                "sequence": TERM_BBSI_3BP,
            },
            {
                "start": three_prime_filler_start,
                "end": len(trimmed["sequence"]),
                "color": ANNOTATION_COLORS[0],
                "name": "filler",
                "sequence": trimmed["three_prime_filler"],
            },
        ],
    }


def build_sgRNA(sequence: str):
    """builds sense and antisense sgRNA from the given sequence"""
    if sequence[0].lower() != "G":
        sequence = f"G{sequence}"
    return {
        "sense": f"{SENSE_PE3_OVERHANG}{sequence}",
        "antisense": f"{ANTISENSE_PE3_OVERHANG}{revComp(sequence)}",
    }


def create_spacers(wtSeq, mutSeq, pamSeq):
    """finds spacers and determines best and OK options"""

    wtSeq = wtSeq.upper()
    mutSeq = mutSeq.upper()
    pamSeq = pamSeq.upper()

    delStart = wtSeq.find("(")
    delStop = wtSeq.find(")") - 1
    cleanSeq = wtSeq.replace("(", "").replace(")", "")

    # Find all pams and create spacers
    spacerInfo = []
    for partial in [
        {
            "wt": (
                cleanSeq[0:delStart]
                + cleanSeq[delStart : delStart + len(pamSeq) + SPACER_END_TO_CUT]
            ),
            "mut": mutSeq,
        },
        {
            "wt": revComp(
                cleanSeq[delStop - len(pamSeq) - SPACER_END_TO_CUT : delStop]
                + cleanSeq[delStop : len(cleanSeq)]
            ),
            "mut": revComp(mutSeq),
        },
    ]:
        pams = re.finditer(ntToRegex(pamSeq), partial["wt"])
        for match in pams:
            pam = match.group(1)
            i = match.start(1)
            if i > GUIDE_LENGTH:
                spacer = partial["wt"][i - GUIDE_LENGTH : i]
                testSeq = partial["wt"][i - GUIDE_TEST_LENGTH : i + len(pamSeq)]
                cutToMut = (len(partial["wt"]) - len(pamSeq)) - (i - CUT_TO_PAM_LENGTH)
                if cutToMut < TOO_FAR_FROM_CUT:
                    info = {
                        "spacer": spacer,
                        "cutToMut": cutToMut,
                        "quality": 1 if partial["mut"].find(testSeq) < 0 else 2,
                    }
                    spacerInfo.append(info)

    spacerInfo.sort(key=lambda info: info["cutToMut"])
    spacerInfo.sort(key=lambda info: info["quality"])

    return spacerInfo


def get_defaulted_inputs(input: PegInput):
    "generates an input object with defaults filled in for missing values"
    if input.minPbs and input.maxPbs:
        pbsRange = {"start": input.minPbs, "stop": input.maxPbs}
    else:
        pbsRange = {
            "start": DEFAULT_PBS_RANGE["start"],
            "stop": DEFAULT_PBS_RANGE["stop"],
        }

    if input.minRt and input.maxRt:
        rtRange = {"start": input.minRt, "stop": input.maxRt}
    else:
        rtRange = calcRtRange(input.mut)

    return {
        "wildtype": input.wtSeq,
        "mutation": input.mut,
        "spacer": input.spacer,
        "pam": input.pam or DEFAULT_PAM,
        "pbsRange": pbsRange,
        "rtRange": rtRange,
    }


def is_typeIIs_Anzalone(pegRNA):
    return "GGTCTC" in pegRNA


def is_typeIIs_Richardson(pegRNA):
    return "GAAGAC" in pegRNA
