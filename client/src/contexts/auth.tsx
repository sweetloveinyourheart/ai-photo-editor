"use client"

import axios from "axios";
import { refreshNewToken, SignInResponse } from "@/services/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearRefreshToken, getRefreshToken, setRefreshToken } from "@/utils/cookies";
import Authentication from "@/components/auth";
import PageLoading from "@/ui/page-loading/page-loading";

interface Auth {
    accessToken: string | null
    addTokens: (tokens: SignInResponse) => void
    removeTokens: () => void
}

const AuthContext = createContext({} as Auth)

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: { children: any }) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const addTokens = useCallback((tokens: SignInResponse) => {
        setAccessToken(tokens.access_token)
        setRefreshToken(tokens.refresh_token)
    }, [])

    const removeTokens = useCallback(() => {
        setAccessToken(null)
        clearRefreshToken()
    }, [])

    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        }
    }, [accessToken])

    useEffect(() => {
        const rfToken = getRefreshToken()
        if (!rfToken) {
            setLoading(false)
            return;
        }

        // gain access_token
        (async () => {
            const token = await refreshNewToken(rfToken)
            if (!token) {
                setAccessToken(null)
                setLoading(false)
                return;
            }
            setAccessToken(token.access_token)
            setLoading(false)
        })()

        // refresh token every 10 minute
        const timer = setInterval(async () => {
            const token = await refreshNewToken(rfToken)
            if (!token) {
                clearInterval(timer)
                setAccessToken(null)
                return;
            }
            setAccessToken(token.access_token)
        }, 10 * 60 * 1000);

        return () => clearInterval(timer);
    }, [])

    const memoedValue = useMemo(() => ({
        accessToken,
        addTokens,
        removeTokens
    }), [])

    if (loading) return <PageLoading />
    
    return (
        <AuthContext.Provider value={memoedValue}>
            {accessToken ? children : <Authentication />}
        </AuthContext.Provider>
    )
}