import sys
import argparse
from types import SimpleNamespace

from src.core.sequence_utils import DEFAULT_PBS_RANGE, calcRtRange

from src.core.main import main
from src.core.csv import writeCsvFile

if __name__ == "__main__":
    args = {}
    if len(sys.argv) > 1:
        # Command line input
        parser = argparse.ArgumentParser()
        parser.add_argument(
            "--wildtype",
            help="Wildtype sequence with parenthases at/around mutation site",
        )
        parser.add_argument(
            "--mutation", help="Additions (leave blank if performing deletion)"
        )
        parser.add_argument("--spacer", help="Sequence of spacer")
        parser.add_argument("--pam", help="PAM sequence (use IUPAC ambiguity as needed")
        parser.add_argument(
            "--pbsrange",
            nargs=2,
            help="Min and max PBS lengths (to override defaults (8-18), specify both values)",
        )
        parser.add_argument(
            "--rtrange",
            nargs=2,
            help="Min and max RT lengths (to override defaults, specify both values - defaults depend on length of mutation)",
        )
        parser.add_argument("--file", help="The name of the csv file to output to")
        args = parser.parse_args()
    else:
        # Progressive input
        args["wildtype"] = input("Please input your wildtype sequence: ").upper()
        args["mutation"] = input(
            "Please input your mutation sequence. For deletion, leave blank: "
        ).upper()
        args["spacer"] = input("Please input your spacer sequence: ").upper()
        args["pam"] = (
            input("Please input your PAM (NGG is default): ") or "NGG"
        ).upper()
        pbsRangeStart = input(
            "Enter PBS start (" + str(DEFAULT_PBS_RANGE["start"]) + " is default): "
        ) or str(DEFAULT_PBS_RANGE["start"])
        pbsRangeStop = input(
            "Enter PBS stop (" + str(DEFAULT_PBS_RANGE["stop"]) + " is default): "
        ) or str(DEFAULT_PBS_RANGE["stop"])
        args["pbsrange"] = [pbsRangeStart, pbsRangeStop]
        defaultRtRange = calcRtRange(args["mutation"])
        rtRangeStart = input(
            "Enter RT start (" + str(defaultRtRange["start"]) + " is default): "
        ) or str(defaultRtRange["start"])
        rtRangeStop = input(
            "Enter RT stop (" + str(defaultRtRange["stop"]) + " is default): "
        ) or str(defaultRtRange["stop"])
        args["rtrange"] = [rtRangeStart, rtRangeStop]

        output_file = (
            input("Enter output file (presto_output.csv is default): ")
            or "presto_output.csv"
        )
        args["file"] = output_file

        args = SimpleNamespace(**args)

    # Input object
    inputs = {
        "wildtype": args.wildtype,
        "mutation": args.mutation if args.mutation else "",
        "spacer": args.spacer,
        # Advanced
        "pam": args.pam if args.pam else "NGG",
        "pbsRange": {"start": int(args.pbsrange[0]), "stop": int(args.pbsrange[1])}
        if args.pbsrange and "" not in args.pbsrange
        else DEFAULT_PBS_RANGE,
        "rtRange": {"start": int(args.rtrange[0]), "stop": int(args.rtrange[1])}
        if args.rtrange and "" not in args.rtrange
        else calcRtRange(args.mutation if args.mutation else ""),
    }

    values = main(inputs)
    writeCsvFile(args.file or "presto_output.csv", values)
