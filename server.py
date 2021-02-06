import os
from io import StringIO
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from uuid import uuid4

from starlette.responses import StreamingResponse

from src.core.sequence_utils import (
    DEFAULT_PAM,
    DEFAULT_PBS_RANGE,
    build_final_pegRNA,
    build_sgRNA,
    calcRtRange,
    clean_sequence,
    create_final_wtSeq,
    create_mutSeq,
    createPBS,
    createPE3,
    createRT,
    create_spacers,
    find_cas9_cut,
    find_deletion,
    find_deletion_range,
    flip_strand_if_needed,
    get_defaulted_inputs,
    is_top_strand,
)
from src.core.csv import writeCsvFile
from src.core.main import main
from src.core.models import Pe3ResultInput, PegInput, PegResultInput

from datetime import datetime

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="src/web/ui/build/static"), name="static")
app.mount("/styles", StaticFiles(directory="src/web/ui/build/styles"), name="styles")
app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/icon", StaticFiles(directory="src/web/ui/public/icon"), name="icon")
templates = Jinja2Templates(directory="src/web/ui/build")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/generate/rt")
async def generate_rt(input: PegInput):
    # make sure the spacer sequence can be found
    try:
        isTopStrand = is_top_strand(input.wtSeq, input.spacer)
        wtSeq = flip_strand_if_needed(input.wtSeq, input.spacer)
    except ValueError:
        print("ERROR: Spacer sequence not found")
        return {"errors": ["Spacer sequence not found"]}

    # Identify insertion and/or deletion
    [delStart, delStop] = find_deletion_range(wtSeq)
    deletion = find_deletion(wtSeq)
    # Create mutant sequence by removing any deletions and adding any insertions
    mutSeq = create_mutSeq(wtSeq, input.mut)
    # Remove parentheses from user input wt sequence
    wtFinal = create_final_wtSeq(input.wtSeq)
    cut = find_cas9_cut(wtFinal, input.spacer)
    wtSeq = wtFinal

    return createRT(mutSeq, input.mut, cut, delStart, DEFAULT_PBS_RANGE)


@app.post("/generate/pbs")
async def generate_pbs(input: PegInput):
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    wtFinal = create_final_wtSeq(input.wtSeq)
    cut = find_cas9_cut(wtFinal, input.spacer)
    return createPBS(mutSeq, cut, DEFAULT_PBS_RANGE)


@app.post("/generate/pe3")
async def generate_pe3(input: PegInput):
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    wtFinal = create_final_wtSeq(input.wtSeq)
    cut = find_cas9_cut(wtFinal, input.spacer)
    return [
        x
        for x in createPE3(wtFinal, mutSeq, DEFAULT_PAM, cut)
        if len(x.get("secondGuide", "")) > 0
    ]


@app.post("/generate/mutSeq")
async def generate_mut_seq(input: PegInput):
    return {"sequence": create_mutSeq(input.wtSeq, input.mut)}


@app.post("/generate/cleanWtSeq")
async def generate_wt_seq(input: PegInput):
    return {"sequence": clean_sequence(input.wtSeq)}


@app.post("/generate/pegrna")
async def generate_pegrna(input: PegResultInput):
    return build_final_pegRNA(input.spacer, input.rtt, input.pbs)


@app.post("/generate/sgrna")
async def generate_pegrna(input: Pe3ResultInput):
    return build_sgRNA(input.pe3)


@app.post("/generate/spacer_sgrna")
async def generate_pegrna(input: PegInput):
    return build_sgRNA(input.spacer)


@app.post("/generate/spacers")
async def generate_spacers(input: PegInput):
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    return create_spacers(input.wtSeq, mutSeq, input.pam)


@app.post("/generate/csv")
async def generate_csv(input: PegInput):

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

    inputs = {
        "wildtype": input.wtSeq,
        "mutation": input.mut,
        "spacer": input.spacer,
        "pam": input.pam or DEFAULT_PAM,
        "pbsRange": pbsRange,
        "rtRange": rtRange,
    }

    filename = f"pegassist-{datetime.now()}.csv"
    local_file_path = f"{str(uuid4())}.csv"
    values = main(inputs)
    writeCsvFile(local_file_path, values)

    csv_stream = StringIO()
    with open(local_file_path, "r") as f:
        print("".join([line for line in f.readlines()]), sep=None, file=csv_stream)

    if os.path.exists(local_file_path):
        os.remove(local_file_path)

    response = StreamingResponse(
        iter([csv_stream.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "FileName": filename,
        },
    )

    return response


@app.post("/generate/warnings")
async def generate_warnings(input: PegInput):
    defaulted_input = get_defaulted_inputs(input)

    values = main(defaulted_input)
    warnings = values.get("warnings", {"general": [], "pegRna": [], "pe3": []})

    return warnings


@app.post("/generate/errors")
async def generate_warnings(input: PegInput):
    defaulted_input = get_defaulted_inputs(input)

    values = main(defaulted_input)
    warnings = values.get("errors", [])

    return warnings
