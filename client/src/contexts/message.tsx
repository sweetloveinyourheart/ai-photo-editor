'use client'

import PopupMessage from "@/components/message/message"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

interface Message {
    newMessage: (msg: string, type: 'success' | 'error' | 'warning', duration?: number) => void
}

const MessageContext = createContext({} as Message)

export function useMessage() {
    return useContext(MessageContext)
}

export default function MessageProvider({ children }: any) {
    const [visible, setVisible] = useState(false);
    const [duration, setDuration] = useState(3000)
    const [message, setMessage] = useState('')
    const [type, setType] = useState<'success' | 'error' | 'warning'>('success')

    const newMessage = useCallback((msg: string, type: 'success' | 'error' | 'warning', duration?: number) => {
        setVisible(true)
        setMessage(msg)
        setType(type)
        setDuration(duration ?? 3000)
    }, [])

    useEffect(() => {
        if(visible) {
            const timer = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timer);
        }

    }, [duration, visible]);

    return (
        <MessageContext.Provider value={{
            newMessage
        }}>
            {children}
            <PopupMessage message={message} type={type} visible={visible}/>
        </MessageContext.Provider>
    )
}