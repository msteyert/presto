import os
from src.core.sequence_utils import GUIDE_LENGTH, CUT_TO_PAM_LENGTH


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
    writeLine(
        "Flap homology region length",
        "Flap homology region G/C content",
        "Default",
        "RT sequence",
        "Error?",
    )
    for o in values["reverseTranscriptaseTemplates"]:
        if o["startsWithC"] == False:
            writeLine(
                str(o["fhrLength"]),
                str(o["fhrGC"]),
                ("Yes" if o["isDefault"] else ""),
                o["rt"],
                o["error"],
            )
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
            o["error"],
        )
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
        writeLine(
            "Cut index", "Distance between spacer and PE3 guide cut sites", "PE3 guide"
        )
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
