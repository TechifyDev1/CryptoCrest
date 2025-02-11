import axios from "axios";

export const fetchCryptoPrice = async (asset: string) => {
  try {
    // Fetch the list of coins
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    console.log(response.data);

    // Find the exact coin by name
    const exactCoin = response.data.find((coin: any) => coin.name.toLowerCase() === asset.toLowerCase());
    
    if (!exactCoin) {
      console.error("Coin not found:", asset);
      return 0; // Return 0 if the coin is not found
    }

    const coinId = exactCoin.id;

    // Fetch price details for the coin
    const coinWithPrice = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const price = coinWithPrice.data.market_data.current_price.usd;

    console.log(price);
    return price || 0;
  } catch (error) {
    console.error("Error fetching price:", error);
    return 0;
  }
};
