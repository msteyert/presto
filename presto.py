from src.core.sequence_utils import (
    CUT_TO_PAM_LENGTH,
    GUIDE_LENGTH,
    TOO_FAR_FROM_CUT,
    revComp,
    createRT,
    createPBS,
    createPE3,
    checkPam,
)
from src.core.csv import writeCsvFile
from src.core.main import main

if __name__ == "__main__":
    # Command line input
    # wt = input("Please input your wildtype sequence: ").upper()
    # mut = input("Please input your mutation sequence. For deletion, leave blank: ").upper()
    # spacer = input("Please input your spacer sequence: ").upper()
    # pam = input("Please input your spacer sequence: ").upper()

    # Input object
    inputs = {
        "wildtype": "CACAACTCACTTAGCAAAGCTGCCCGCCGCCTCAGCCTAATGTTACACGGCCTTGTGACCCCTAGCCTCCCTGGG(AAAAAAAAAAA)CCCTAGCCATTTAAAGAGGGATGAGGTGATGCTGAAGGCCAGTTGGCA",
        "mutation": "ggctcacgtttggaagaggaactgagacgccgcttaactgaa",
        "spacer": "CATCCCTCTTTAAATGGCTA",
        # Advanced
        "pam": "NGG",
        "pbsRange": {"start": 8, "stop": 18},
    }
    values = main(inputs)
    writeCsvFile(values)


"""
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
"""

