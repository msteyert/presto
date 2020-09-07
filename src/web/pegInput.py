import os
from src.core.sequence_utils import (
    createRT,
    createPE3,
    createPBS,
    flip_strand_if_needed,
    find_deletion,
    find_deletion_range,
    create_mutSeq,
    clean_sequence,
    find_cas9_cut,
    ensure_5_prime_cut,
    is_top_strand,
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
