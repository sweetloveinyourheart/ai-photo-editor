import { User } from '@/components/profile'
import axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT


async function getProfile(): Promise<User | null> {
    try {
        const { data } = await axios.get(`${apiEndpoint}/user/profile`)
        return data.user
    } catch (error) {
        return null
    }
}

async function editProfile(profile: any) {
    try {
        const { data } = await axios.post(`${apiEndpoint}/user/edit-profile`, profile)
        return data

    } catch (error) {
        return null
    }
}

export {
    getProfile,
    editProfile
}