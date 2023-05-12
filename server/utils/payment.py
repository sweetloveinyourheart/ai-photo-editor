import os
import requests
from dotenv import load_dotenv

load_dotenv()

client_id = os.environ.get("CLIENT_ID")
app_secret = os.environ.get("APP_SECRET")

async def generate_access_token():
    auth = (client_id, app_secret)
    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    data = {"grant_type": "client_credentials"}
    response = requests.post(url, auth=auth, data=data)
    response.raise_for_status()
    access_token = response.json()["access_token"]
    return access_token

async def create_order(order_data):
    access_token = await generate_access_token()
    url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }

    data = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": order_data['amount'],
                },
            },  
        ],
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()

async def capture_payment(order):
    access_token = await generate_access_token()

    order_id = order.orderID
    url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{order_id}/capture"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.post(url, headers=headers)
    response.raise_for_status()
    return response.json()
