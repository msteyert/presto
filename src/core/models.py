from pydantic import BaseModel
from typing import Optional


class PegInput(BaseModel):
    wtSeq: str
    mut: str
    spacer: str
    pam: Optional[str] = None
    minPbs: Optional[int] = None
    maxPbs: Optional[int] = None
    minRt: Optional[int] = None
    maxRt: Optional[int] = None


class PegResultInput(BaseModel):
    spacer: str
    rtt: str
    pbs: str


class Pe3ResultInput(BaseModel):
    pe3: str
