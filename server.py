from fastapi import FastAPI, Request
from src.core.sequence_utils import (
    calcRtRange,
    createPBS,
    createPE3,
    createRT,
    clean_sequence,
    create_mutSeq,
    find_cas9_cut,
    DEFAULT_PAM,
    DEFAULT_PBS_RANGE,
    find_deletion,
    find_deletion_range,
)
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from src.web.models import PegInput

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
templates = Jinja2Templates(directory="ui/build")


@app.get("/")
async def root(request: Request):
    # return templates.TemplateResponse("main.jinja", {"request": request})
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/generate/rt")
async def generate_rt(input: PegInput):
    cut = find_cas9_cut(input.wtSeq, input.spacer)
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    [delStart, _] = find_deletion_range(input.wtSeq)
    rtInfo = createRT(mutSeq, input.mut, cut, delStart, calcRtRange(mutSeq))
    return [x for x in rtInfo if not x["startsWithC"]]


@app.post("/generate/pbs")
async def generate_pbs(input: PegInput):
    cut = find_cas9_cut(input.wtSeq, input.spacer)
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    return createPBS(mutSeq, cut, DEFAULT_PBS_RANGE)


@app.post("/generate/pe3")
async def generate_pe3(input: PegInput):
    cut = find_cas9_cut(input.wtSeq, input.spacer)
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    return createPE3(input.wtSeq, mutSeq, DEFAULT_PAM, cut)


@app.post("/generate/mutSeq")
async def generate_mut_seq(input: PegInput):
    return {"sequence": create_mutSeq(input.wtSeq, input.mut)}


@app.post("/generate/cleanWtSeq")
async def generate_wt_seq(input: PegInput):
    return {"sequence": clean_sequence(input.wtSeq)}
