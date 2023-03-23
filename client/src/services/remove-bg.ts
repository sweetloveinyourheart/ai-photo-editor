import axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT

interface RemoveBGResult {
    error: string | null
    image: any
}

async function removeBackground(image: Blob): Promise<RemoveBGResult> {
    try {
        let formData = new FormData()
        formData.append("file", image)
        const { data } = await axios.post(
            `${apiEndpoint}/background/remove-bg`, 
            formData, 
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        if(!data) throw new Error()

        return {
            error: null,
            image: data
        }
    } catch (error) {
        return {
            error: 'Remove background task failed !',
            image: null
        }
    }
}

export {
    removeBackground
}