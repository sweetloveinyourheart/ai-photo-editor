from pydantic import BaseModel

class PaymentDTO(BaseModel):
    member_tier: int

class CapturePaymentDTO(BaseModel):
    orderID: str