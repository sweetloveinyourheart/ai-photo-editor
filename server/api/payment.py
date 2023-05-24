from fastapi import APIRouter, Depends
from utils import create_order, capture_payment
from .dto import PaymentDTO, CapturePaymentDTO
from models import Payment, User, Plan
from fastapi_jwt_auth import AuthJWT
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/create-paypal-order")
async def create_paypal_order(order: PaymentDTO):
    order_amount = 0
    if order.member_tier == 1:
        order_amount = 9.99
    else:
        order_amount = 19.99

    order_data = { "amount": order_amount }
    order = await create_order(order_data)
    return order

@router.post("/capture-paypal-order")
async def capture_paypal_order(order: CapturePaymentDTO, authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    capture_data = await capture_payment(order)

    current_user = authorize.get_jwt_subject()
    account = db.query(User).filter(User.email == current_user).first()

    amount = float(capture_data['purchase_units'][0]['payments']['captures'][0]['amount']['value'])

    # upgrade account plan
    plan = db.query(Plan).filter(Plan.user_id == account.id).first()
    if amount < 10.00:
        plan.membership_tier = 1
        plan.generation_limited = 50
    else:
        plan.membership_tier = 2
        plan.generation_limited = 100

    #store payment information such as the transaction ID
    new_payment = Payment(
        user_id=account.id,
        description=f'Purchase for AI Art member tier {amount} USD',
        amount=amount
    )

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)    

    return capture_data
