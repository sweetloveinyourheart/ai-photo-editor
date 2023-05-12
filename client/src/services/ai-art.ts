import axios from "axios";

const apiEndpoint = process.env.API_ENDPOINT

interface GeneratedImages {
    created: number
    data: { b64_json: string }[]
}

export async function GenerateImageByText(text: string): Promise<GeneratedImages> {
    try {
        const { data } = await axios.post<GeneratedImages>(`${apiEndpoint}/generator/text`, { decoration: text, number: 1 })
        return data
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}