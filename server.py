from fastapi import FastAPI, Request
from src.core.sequence_utils import (
    build_pe3_sgRNA,
    createPBS,
    createPE3,
    createRT,
    clean_sequence,
    create_final_wtSeq,
    create_mutSeq,
    find_cas9_cut,
    DEFAULT_PAM,
    DEFAULT_PBS_RANGE,
    find_deletion,
    find_deletion_range,
    flip_strand_if_needed,
    is_top_strand,
    build_untrimmed_pegRNA,
    trim_sequence,
)
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from src.web.models import Pe3ResultInput, PegInput, PegResultInput

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
    print(createPE3(wtFinal, mutSeq, DEFAULT_PAM, cut))
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
    untrimmed = build_untrimmed_pegRNA(input.spacer, input.rtt, input.pbs)
    return {"sequence": trim_sequence(untrimmed)}


@app.post("/generate/sgrna")
async def generate_pegrna(input: Pe3ResultInput):
    return build_pe3_sgRNA(input.pe3)
