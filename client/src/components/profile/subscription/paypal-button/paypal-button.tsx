import { useMessage } from "@/contexts/message";
import { OrderData, approveOrder, createOrder } from "@/services/payment";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FunctionComponent } from "react";

interface PaypalButtonProps {
    order: OrderData
}

const PaypalButton: FunctionComponent<PaypalButtonProps> = ({ order }) => {
    const { newMessage } = useMessage()

    const onCreateOrder = async () => {
        return await createOrder(order)
    }

    const onApprove = async (data: any) => {
        await approveOrder(data.orderID)
        window?.location.reload()
    }
    return (
        <PayPalButtons
            createOrder={(data, actions) => onCreateOrder()}
            onApprove={(data, actions) => onApprove(data)}
            onError={(err) => {
                newMessage('Paypal issues have been detected', 'error')
            }}
        />
    );
}

export default PaypalButton;