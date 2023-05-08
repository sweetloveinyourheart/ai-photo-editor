import axios from "axios";

const apiEndpoint = process.env.API_ENDPOINT

export interface NewUserData {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    birthday?: string
}

export interface SignInResponse {
    access_token: string
    refresh_token: string
}

export interface OAuth {
    email?: string | null
    name?: string | null
    image?: string | null
}

async function signIn(email: string, password: string): Promise<SignInResponse | null> {
    try {
        const { data } = await axios.post<SignInResponse>(`${apiEndpoint}/auth/signin`, { email, password })
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

async function OAuth(user: OAuth): Promise<SignInResponse | null> {
    try {
        const { data } = await axios.post<SignInResponse>(`${apiEndpoint}/auth/oauth`, {
            email: user.email,
            name: user.name,
            profile_pic: user.image
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
    refreshNewToken,
    OAuth
}