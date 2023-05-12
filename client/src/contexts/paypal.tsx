"use client"

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState, createContext, useContext } from "react";

interface PaypalContext {
    scriptLoaded: boolean
}

const PaypalContext = createContext({} as PaypalContext)

export function usePaypal() {
    return useContext(PaypalContext)
}

const initialOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
};

export default function PaypalProvider({ children }: any) {
    const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

    useEffect(() => {
        const addPaypalScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&disable-funding=card`;
            script.async = true;

            script.onload = () => setScriptLoaded(true);

            document.body.appendChild(script);
        };
        addPaypalScript();
    }, []);

    return (
        <PaypalContext.Provider value={{ scriptLoaded }}>
            <PayPalScriptProvider options={initialOptions}>
                {children}
            </PayPalScriptProvider>
        </PaypalContext.Provider>
    );
}