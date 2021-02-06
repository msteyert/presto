"main program logic for presto"

from src.core.sequence_utils import (
    GUIDE_LENGTH,
    TOO_FAR_FROM_CUT,
    create_final_wtSeq,
    create_mutSeq,
    find_cas9_cut,
    find_deletion,
    find_deletion_range,
    flip_strand_if_needed,
    is_top_strand,
    revComp,
    createRT,
    createPBS,
    createPE3,
    checkPam,
)


def main(inputs):
    # Put in sequences
    wtSeq = inputs["wildtype"].upper()
    mut = inputs["mutation"].upper()
    spacer = inputs["spacer"].upper()
    # Advanced
    pamSeq = inputs["pam"].upper()
    pbsRange = inputs["pbsRange"]
    rtRange = inputs["rtRange"]

    # make sure the spacer sequence can be found
    try:
        isTopStrand = is_top_strand(wtSeq, spacer)
        wtSeq = flip_strand_if_needed(wtSeq, spacer)
    except ValueError:
        print("ERROR: Spacer sequence not found")
        return {"errors": ["Spacer sequence not found"]}

    # Identify insertion and/or deletion
    [delStart, delStop] = find_deletion_range(wtSeq)
    deletion = find_deletion(wtSeq)
    # Create mutant sequence by removing any deletions and adding any insertions
    mutSeq = create_mutSeq(wtSeq, mut)
    # Remove parentheses from user input wt sequence
    wtFinal = create_final_wtSeq(wtSeq)
    cut = find_cas9_cut(wtFinal, spacer)
    wtSeq = wtFinal

    # Ensure that the cut site is 5' of the mutation
    if cut > delStart:
        print(
            "ERROR: The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again."
        )
        return {
            "errors": [
                "The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again."
            ]
        }

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
    warnings = {"general": [], "pegRna": [], "pe3": []}

    # Spacer warnings
    if len(spacer) != GUIDE_LENGTH:
        warnings["general"].append("Spacer is not the correct length.")
    if pamInfo["wrongSpacer"]:
        warnings["general"].append("Spacer has an incorrect PAM site.")
    if pamInfo["reCutOccurs"]:
        warnings["general"].append(
            "Spacer will be able to nick mutant DNA. This may have deleterious effects."
        )

    # Cut is close enough for efficient editing
    if delStart - cut > TOO_FAR_FROM_CUT:
        warnings["general"].append(
            "The cut site of your spacer is far from the edited region. This may reduce editing efficiency."
        )

    # PE3 warnings
    if pe3Info == []:
        warnings["pe3"].append(
            "No PAM sites on mutant strand! Try using a longer strech of wildytpe sequence."
        )
    if len(list(filter(lambda o: o["type"] == "pe3", pe3Info))) == 0:
        warnings["pe3"].append(
            "There are no PE3 guides. Try using a longer strech of wildytpe sequence."
        )
    if len(list(filter(lambda o: o["type"] == "pe3b", pe3Info))) == 0:
        warnings["pe3"].append(
            "There are no PE3b guides. If you'd like to use a PE3b strategy, you may be able to add a silent mutation which adds a PAM site in the region spanned by the RT."
        )

    # Poly-T tracks are bad for pegRNA expression
    for o in pbsInfo:
        if o["pbsPolyT"] == True:
            warnings["pegRna"].append(
                "Poly-T tracks of length 4 or more were found in PBS option(s), and may reduce pegRNA expression."
            )
            break
    # RTs that end with C are NOT recommended (see Anzalone, 2019)
    for o in rtInfo:
        if o["startsWithC"] == True:
            warnings["pegRna"].append(
                "RT template is NOT RECOMMENDED because 5' end is a C: " + o["rt"]
            )
    for o in rtInfo:
        if o["rtPolyT"] == True:
            warnings["pegRna"].append(
                "Poly-T tracks of length 4 or more were found in RT option(s), and may reduce pegRNA expression."
            )
            break

    # TODO add warning if the typeIIs sequence is found (see functions is_typeIIs_Anzalone and is_typeIIs_Richardson in sequence_utils)
    #  "pegRNA contains restriction enzyme cut site and will be destroyed during assembly. Consider alternative cloning strategy."

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
