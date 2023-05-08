"use client"

import axios from "axios";
import { OAuth, refreshNewToken, SignInResponse } from "@/services/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearRefreshToken, getRefreshToken, setRefreshToken } from "@/utils/cookies";
import Authentication from "@/components/auth";
import PageLoading from "@/ui/page-loading/page-loading";
import { useSession } from "next-auth/react";

interface Auth {
    accessToken: string | null
    addTokens: (tokens: SignInResponse) => void
    removeTokens: () => void
}

const AuthContext = createContext({} as Auth)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthGuard({ children }: { children: any }) {
    const { accessToken } = useAuth()

    return (
        <>
            {!accessToken ? <Authentication /> : null}
            {children}
        </>
    )
}

export default function AuthProvider({ children }: { children: any }) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const { data: session } = useSession()

    const addTokens = useCallback((tokens: SignInResponse) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`
        setAccessToken(tokens.access_token)
        setRefreshToken(tokens.refresh_token)
    }, [])

    const removeTokens = useCallback(() => {
        setAccessToken(null)
        clearRefreshToken()
    }, [])

    useEffect(() => {
        const user = session?.user
        const rfToken = getRefreshToken()

        if (user && !accessToken && !rfToken) {
            (async () => {
                const authData = await OAuth(user)
                if (authData) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${authData.access_token}`
                    setAccessToken(authData.access_token)
                    setRefreshToken(authData.refresh_token)
                }
            })()
        }
    }, [session])


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

            axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`
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
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`
            setAccessToken(token.access_token)
        }, 10 * 60 * 1000);

        return () => clearInterval(timer);
    }, [])

    const memoedValue = useMemo(() => ({
        accessToken,
        addTokens,
        removeTokens
    }), [accessToken, addTokens, removeTokens])

    if (loading) return <PageLoading />

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}