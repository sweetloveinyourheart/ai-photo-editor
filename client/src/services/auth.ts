import axios from "axios";

const apiEndpoint = process.env.API_ENDPOINT

export interface NewUserData {
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email?: string,
    birthday?: string
}

export interface SignInResponse {
    access_token: string
    refresh_token: string
}

async function signIn(username: string, password: string): Promise<SignInResponse | null> {
    try {
        const { data } = await axios.post<SignInResponse>(`${apiEndpoint}/auth/signin`, { username, password })
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function signUp(newUser: NewUserData): Promise<{ message: string } | null> {
    try {
        const { data } = await axios.post(`${apiEndpoint}/auth/signup`, newUser)

        if (!data) throw new Error()
        return data
    } catch (error) {
        return null
    }
}

async function refreshNewToken(refresh_token: string) {
    try {
        const { data } = await axios.get<{ access_token: string }>(`${apiEndpoint}/auth/refresh`, {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        })

        if (!data) throw new Error()
        return data
    } catch (error) {
        return null
    }
}

export {
    signIn,
    signUp,
    refreshNewToken
}