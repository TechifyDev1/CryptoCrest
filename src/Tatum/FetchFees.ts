import axios from "axios"
const apiKey = import.meta.env.VITE_TATUM_API_KEY;

const fetchFees = async (asset: string) => {
    const baseURL = `https://api.tatum.io/v3/${asset}/gas`;
    try{
        const response = axios.get(baseURL, {
            headers: {"x-api-key": apiKey}
        });
        console.log((await response).data);
        return (await response).data;
    } catch(e: any) {
        console.log(e);
        return null;
    }
}

export {fetchFees}