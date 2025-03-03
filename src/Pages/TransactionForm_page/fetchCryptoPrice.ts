import axios from 'axios';
import debounce from 'lodash.debounce';

const COINGECKO_API_LIST = 'https://api.coingecko.com/api/v3/coins/list';
const COINGECKO_API_PRICE = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

const fetchCryptoPrice = debounce(async (asset: string): Promise<{ price: number; coinId: string; img: string; symbol: string } | null> => {
  try {
    const response = await axios.get(COINGECKO_API_LIST);

    const exactCoin = response.data.find(
      (coin: any) => coin.name.toLowerCase() === asset.toLowerCase()
    );

    if (!exactCoin) {
      console.error('Coin not found:', asset);
      return null; // Explicitly return null if the coin is not found
    }

    const coinId = exactCoin.id;
    const coinWithPrice = await axios.get(COINGECKO_API_PRICE(coinId));
    const price = coinWithPrice.data.market_data.current_price.usd;
    const img = coinWithPrice.data.image.small;
    const symbol = coinWithPrice.data.symbol;

    return { price, coinId, img, symbol };
  } catch (error) {
    console.error('Error fetching price:', error);
    return null; // Explicitly return null on error
  }
}, 1000);

export { fetchCryptoPrice };
