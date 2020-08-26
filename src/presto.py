''' WELCOME TO THE INPUT VERSION OF PEGasos version 6.2! '''

# This program can be used to easily generate pegRNA sequences suitable for Prime Editing (Anzalone et al 2019).

# PegRNAs are made up of a custom spacer, primer binding site (PBS), reverse transcriptase template (RT) as well as the standardized scaffold segment.
# Given a spacer and your desired edits, this program will output many options for PBSs and RTs you may wish to use.
# These components are necessary for even the most simple prime editing scheme (PE2).

# You may consider a PE3/PE3b knockin (KI) strategy, which typically increases efficency of KI. This requires an additional sgRNA (dubbed the PE3/PE3b guide).
# PE3 guides cannot distinquish between edited and unedited DNA, while PE3b guides are only able to bind once the first strand has been edited.
# This program will output options for both if they exist.



''' INSTRUCTIONS FOR USE '''

### Once you run the program (in python3) you will be prompted for the following, respectively:

# 1. The wildtype sequence with parentheses surrounding any deletions you'd like to make
# 2. The sequence you'd like to insert (leave it blank if it's a deletion)
# 3. The sequence of the spacer you've chosen.


### Pro tips:

# All sequences should be copied in as 5' to 3' and the output is to be read 5' to 3'. 
# The program is not case sensitive.
# If you have an unknown base in your input, use N as the placeholder. Other non-ATGC letters may result in errors.
# The program works best with ~100-150bp on either side of the mutation site. The examples shown below are much shorter for easy reading.


''' EXAMPLE: insertion of agcgta '''

# ATGCGCTATGGCGATGCTGATATGCGCTATCGA()TTTGCTGATATGCGCTATCGGAGATGCTGAT
# agcgta
# GATGCTGATATGCGCTATCG

''' EXAMPLE: point mutation (t->g) '''

# ATGCGCTATGGCGATGCTGATATGCGCTATCGAT(t)TGCTGATATGCGCTATCGGAGATGCTGAT
# g
# GATGCTGATATGCGCTATCG

''' EXAMPLE: deletion of TATCGA '''

# ATGCGCTATGGCGATGCTGATATGCGC(tatcga)TTTGCTGATATGCGCTATCGGAGATGCTGAT
# 
# GATGCTGATATGCGCTATCG



''' Go forth and edit! '''
''' ~ Marilyn Steyert (with technical assistance from Nick Kostiken and direction from Ryan Richardson) '''


import os


# function for creating the reverse compliment strand
def revComp(seq):
    compliment = ""
    compMap = {
        "A":"T",
        "T":"A",
        "C":"G",
        "G":"C",
        "N":"N",
        "(":")",
        ")":"(",
    }
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
"""add 5 and take out key thing"""
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

    rtInfo = []
    for i in relevantOptions:
        rt = revComp(mutSeq[cut : (cut + len(mut) + 8 + i)])
        info = {
            "flap length": i + 8,
            "rt": rt,
            "flapGC": gcContent(rt),
            "rtTM": tm(rt),
            "startsWithC": rt[0] == "C",
            "rtPolyT": rt.find("TTTT") >= 0 or rt.find("AAAA") >= 0
        }
        rtInfo.append(info)

    return rtInfo


# create primer binding site options
def createPBS(mutSeq, cut):
    pbsInfo = []
    for i in range(0,10):
        pbs = revComp(mutSeq[(cut - 8 - i) : cut])
        info = {
            "length": i + 8,
            "pbs": pbs,
            "pbsGC": gcContent(pbs),
            "pbsTM": tm(pbs),
            "pbsPolyT": pbs.find("TTTT") >= 0 or pbs.find("AAAA") >= 0
        } 
        pbsInfo.append(info)

    return pbsInfo


# Create the PE3 and PE3b guides
def createPE3(wtSeq, mutSeq, cut):
    PE3B_TEST_LENGTH = 18
    rcMutSeq = revComp(mutSeq)
    rcWtSeq = revComp(wtSeq)
    cut = len(mutSeq) - cut
    pe3Info = []
    for i in range(0, len(rcMutSeq)):
        if rcMutSeq[i] == "G" and rcMutSeq[i-1] == "G":
            testSeq = rcMutSeq[i - PE3B_TEST_LENGTH : i + 1]
            info = {
                "pamStart": i,
                "cutPE3": i - 5,
                "cutDiff": abs(i - 5 - cut),
                "secondGuide": rcMutSeq[i - 22 : i - 2],
                "rcSecondGuide": revComp(rcMutSeq[i - 22 : i - 2]),
                "type": "pe3b" if rcWtSeq.find(testSeq) < 0 else "pe3",
            }
            pe3Info.append(info)

    return pe3Info



############################################################
# Program logic
############################################################
def main():
    # Put in sequences
    wtSeq = "CACAACTCACTTAGCAAAGCTGCCCGCCGCCTCAGCCTAATGTTACACGGCCTTGTGACCCCTAGCCTCCCT(AAAAAAAAAAA)TAGCCATTTAAAGAGGGATGAGGTGATGCTGAAGGCCAGTTGGCA" #input("Please input your wildtype sequence: ").upper()
    mut =  "ggctcacgtttggaagaggaactgagacgccgcttaactgaa".upper() #input("Please input your mutation sequence. For deletion, leave blank: ").upper()
    spacer =  "CATCCCTCTTTAAATGGCTA" #input("Please input your spacer sequence: ").upper()

    # Identify insertion and/or deletion
    [delStart, delStop] = [wtSeq.find("("), wtSeq.find(")")]
    deletion = wtSeq[delStart+1 : delStop]
    # Create mutant sequence by removing any deletions and adding any insertions
    mutSeq = wtSeq[0:delStart] + mut + wtSeq[delStop+1:len(wtSeq)]
    # Remove parentheses from user input wt sequence
    wtFinal = wtSeq[0:delStart] + deletion + wtSeq[delStop+1:len(wtSeq)]
    ##############################################wtFinal = wtSeq.translate({ord(i):None for i in '()'})
    cut = wtFinal.find(spacer)

    isTopStrand = True
    if cut < 0:
        # Flip sequence if the spacer is found on the bottom strand
        isTopStrand = False
        wtSeq = revComp(wtSeq)
        mut = revComp(mut)
        [delStart, delStop] = [wtSeq.find("("), wtSeq.find(")")]
        deletion = wtSeq[delStart+1 : delStop]
        mutSeq = wtSeq[0:delStart] + mut + wtSeq[delStop+1:len(wtSeq)]
        wtFinal = wtSeq[0:delStart] + deletion + wtSeq[delStop+1:len(wtSeq)]
        cut = wtFinal.find(spacer)
        if cut < 0:
            print("ERROR: Spacer sequence not found")
            exit()
    # Cas9 cuts 3 positions from the 3' end of the spacer
    cut += len(spacer) - 3
    wtSeq = wtFinal

    # Ensure that the cut site is 5' of the mutation
    if cut > delStart:
        print("ERROR: The spacer must cut upstream (5') of the mutated region. Select a new spacer and try again.")
        exit()

    # Create components of pegRNA
    rtInfo = createRT(mutSeq, mut, cut)
    pbsInfo = createPBS(mutSeq, cut)
    pe3Info = createPE3(wtSeq, mutSeq, cut)





    #########################################################################################
    # Print Section
    #########################################################################################

    # Adjust values for printing
    if isTopStrand == False:
        mutSeq = revComp(mutSeq)
        mut = revComp(mut)
        deletion = revComp(deletion)
        wtSeq = revComp(wtSeq)
        wtFinal = revComp(wtFinal)
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
    print("           Wt seq final :", wtFinal)
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
    if len(spacer) == 20 and wtFinal[cut+5] == "G" and wtFinal[cut+4] == "G":
        print("Note: Spacer is the correct length and has a PAM site compatible with the standard PE enzyme built upon SpCas9. Nice!")
    if len(spacer) != 20:
        print("Warning: Spacer is not the correct length but has a PAM site for the standard PE enzyme built upon SpCas9.")
    if wtFinal[cut+5] != "G" or wtFinal[cut+4] != "G":
        wrongPAM = True
        print("Warning: Spacer has an incorrect PAM site but is correct length for the standard PE enzyme built upon SpCas9.")  

    # cut is close enough for efficient editing
    FAR = 30
    if len(wtSeq[cut:delStart]) > FAR:
        print("Warning: The cut site of your spacer is far from the edited region. This may reduce editing efficiency.")
    
    # spacer can't re-cut DNA after correct editing has occurred
    if wrongPAM == False:
        reCut = mutSeq.find(spacer)
        if reCut > 0 and wtFinal[cut+5] == "G" and wtFinal[cut+4] == "G":
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




    #########################################################################################
    # CSV file writing section
    #########################################################################################

    outputFile = "AAAAAA.csv"
    f = open(outputFile, "w")

    def writeLine(*columns):
        strings = [str(i) for i in columns]
        f.write(",".join(strings) + "\n")

    # Reiterate inputs
    writeLine("INPUTS")
    writeLine("Wildtype sequence" , wtSeq)
    writeLine("Mutation sequence" , mutSeq)
    writeLine("Spacer sequence" , spacer)
    writeLine()
    #Abreviated basic outputs
    if isTopStrand:
        writeLine("Spacer matches on top strand.")
    else:
        writeLine("Spacer matches bottom strand.")
    writeLine("Edited DNA sequence" , mutSeq)
    writeLine()

    #RT table
    writeLine("Reverse transcriptase templates*")
    writeLine("Flap Length" , "Flap G/C content" , "RT sequence")
    rtPoly = False
    for o in rtInfo:
        if o["startsWithC"] == False:
            writeLine(str(o["flap length"]) , str(o["flapGC"]) , o["rt"])
            if o["rtPolyT"] == True:
                rtPoly = True
    writeLine("*In RT \"flap\" refers to the nt of the edited strand that hybridize to the un-edited strand.")
    writeLine()

    #PBS table
    writeLine("Primer binding sites")
    writeLine("Length" , "G/C content" , "Tm" , "PBS sequence")
    pbsPoly = False
    for o in pbsInfo:
        writeLine(str(o["length"]) , str(o["pbsGC"]), str(o["pbsTM"]), o["pbs"])
    writeLine()


    #PE3 table
    if pe3Info == []:
        writeLine("No PAM sites on mutant strand! Try inputting a longer strech of wildytpe sequence.")
        writeLine()
    else:
        pe3 = []
        pe3b = []
        for o in pe3Info:
            if o["type"] == "pe3":
                pe3.append(o)
            elif o["type"] == "pe3b":
                pe3b.append(o)

        if pe3 == []:
            writeLine("There are no PE3 guides. Try inputting a longer strech of wildytpe sequence.")
        else:
            writeLine("PE3 guides")
            writeLine("PE3 guide" , "Cut index" , "Distance between spacer and PE3 guide cut sites")
            for o in pe3:
                if o["pamStart"] >= 23:
                    writeLine(o["secondGuide"],  o["cutPE3"],  o["cutDiff"])
        writeLine()

        if pe3b == []:
            writeLine("There are no PE3b guides.")
            writeLine("If you'd like to use a PE3b strategy, you may be able to add a silent mutation which adds a PAM site in the region spanned by the RT")
            writeLine()
        else:
            writeLine("PE3b guides")
            writeLine("PE3b guide" , "Cut index")
            for o in pe3b:
                if o["pamStart"] >= 23:
                    writeLine(o["secondGuide"],  o["cutPE3"])
        writeLine()

    #Warnings & info

    print()
    print("SPACER")
    if delStart == cut:
        print("Note: Spacer cuts at the mutation site. Nice!")
    else:
        print("Note: Spacer cuts 5' of mutation site. Nice!")


    # spacer works for PE built upon Cas9(wt)
    wrongPAM = False
    if len(spacer) == 20 and wtFinal[cut+5] == "G" and wtFinal[cut+4] == "G":
        print("Note: Spacer is the correct length and has a PAM site compatible with the standard PE enzyme built upon SpCas9. Nice!")
    if len(spacer) != 20:
        print("Warning: Spacer is not the correct length but has a PAM site for the standard PE enzyme built upon SpCas9.")
    if wtFinal[cut+5] != "G" or wtFinal[cut+4] != "G":
        wrongPAM = True
        print("Warning: Spacer has an incorrect PAM site but is correct length for the standard PE enzyme built upon SpCas9.")  

    # cut is close enough for efficient editing
    FAR = 30
    if len(wtSeq[cut:delStart]) > FAR:
        print("Warning: The cut site of your spacer is far from the edited region. This may reduce editing efficiency.")
    
    # spacer can't re-cut DNA after correct editing has occurred
    if wrongPAM == False:
        reCut = mutSeq.find(spacer)
        if reCut > 0 and wtFinal[cut+5] == "G" and wtFinal[cut+4] == "G":
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
    print()
    print("CSV file written to:", os.getcwd() + "/" + outputFile)
    f.close()




if __name__ == "__main__":
    main()
