from pydantic import BaseModel

class TextGenerator(BaseModel):
    decoration: str
    number: int