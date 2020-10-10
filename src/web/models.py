from pydantic import BaseModel


class PegInput(BaseModel):
    wtSeq: str
    mut: str
    spacer: str


class PegResultInput(BaseModel):
    spacer: str
    rtt: str
    pbs: str


class Pe3ResultInput(BaseModel):
    pe3: str
