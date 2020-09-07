from pydantic import BaseModel


class PegInput(BaseModel):
    wtSeq: str
    mut: str
    spacer: str
