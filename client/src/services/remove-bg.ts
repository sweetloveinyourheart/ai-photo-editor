import axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT

interface RemoveBGResult {
    image: Blob | null
}

async function removeBackground(image: Blob): Promise<RemoveBGResult> {
    try {
        let formData = new FormData()
        formData.append("file", image)
        const { data } = await axios.post(
            `${apiEndpoint}/background/remove-bg`, 
            formData, 
            { headers: { 'Content-Type': 'multipart/form-data' }, responseType: 'blob', }
        )
        if(!data) throw new Error()

        return {
            image: data
        }
    } catch (error) {
        return {
            image: null
        }
    }
}

export {
    removeBackground
}