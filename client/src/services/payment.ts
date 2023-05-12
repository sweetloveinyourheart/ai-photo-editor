"use client"
import axios from "axios";

const apiEndpoint = process.env.API_ENDPOINT

export interface OrderData {
    member_tier: number
}

interface Order {
    id: string
}

async function createOrder(order: OrderData): Promise<string> {
    const { data } = await axios.post<Order>(`${apiEndpoint}/payment/create-paypal-order`, order)
    return data.id
}

async function approveOrder(orderId: string) {
    const { data } = await axios.post(`${apiEndpoint}/payment/capture-paypal-order`, {
        orderID: orderId
    })
    return data
}

export {
    createOrder,
    approveOrder
}