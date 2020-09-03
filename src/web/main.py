from fastapi import FastAPI, Request
from pydantic import BaseModel
from pegInput import (
    clean_sequence,
    createPBS,
    create_mutSeq,
    find_cas9_cut,
    main,
    createRT,
)
from fastapi.responses import PlainTextResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


class PegInput(BaseModel):
    wtSeq: str
    mut: str
    spacer: str


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="ui/build/static"), name="static")
templates = Jinja2Templates(directory="ui/build")


@app.get("/")
async def root(request: Request):
    # return templates.TemplateResponse("main.jinja", {"request": request})
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/generate", response_class=PlainTextResponse)
async def generate(input: PegInput):
    return main(wtSeq=input.wtSeq, mut=input.mut, spacer=input.spacer)


@app.post("/generate/rt")
async def generate_rt(input: PegInput):
    cut = find_cas9_cut(input.wtSeq, input.spacer)
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    rtInfo = createRT(mutSeq, input.mut, cut)
    return [x for x in rtInfo if not x["startsWithC"]]


@app.post("/generate/pbs")
async def generate_rt(input: PegInput):
    cut = find_cas9_cut(input.wtSeq, input.spacer)
    mutSeq = create_mutSeq(input.wtSeq, input.mut)
    return createPBS(mutSeq, cut)


@app.post("/generate/mutSeq")
async def generate_rt(input: PegInput):
    return {"sequence": create_mutSeq(input.wtSeq, input.mut)}


@app.post("/generate/cleanWtSeq")
async def generate_rt(input: PegInput):
    return {"sequence": clean_sequence(input.wtSeq)}
