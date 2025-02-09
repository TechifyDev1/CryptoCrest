import axios from "axios"

export const fetchCryptoPrice = async (coin: string): Promise<number> => {
    try{
        const response = axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                ids: coin.toLowerCase(),
                vs_currencies: "usd",
            }
        });

        const price = (await response).data[coin.toLowerCase()]?.usd;
        return price || 0;
    } catch(e: any) {
        console.log(e);
        return 0;
    }
}