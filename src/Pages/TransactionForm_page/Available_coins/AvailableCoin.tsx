import { useEffect, useState } from 'react';
import './Available.css';
import axios from 'axios';

interface AvailableCoinsProps {
  typedCoin: string;
  showAvailableCoins: boolean;
  setChosenCoin: (coin: string) => void;
}

const AvailableCoins: React.FC<AvailableCoinsProps> = ({
  showAvailableCoins,
  setChosenCoin,
  typedCoin,
}) => {
  const [matchedCoins, setMatchedCoins] = useState<any[]>([]);

  useEffect(() => {
    if (!typedCoin) {
      setMatchedCoins([]);
      return;
    }

    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${typedCoin}`
        );
        console.log(response.data.coins);
        setMatchedCoins(response.data.coins);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    // Debounce API call to avoid excessive requests
    const debounceTimer = setTimeout(() => {
      fetchCoins();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [typedCoin]);

  return (
    <div
      className="available-coins"
      style={{ display: showAvailableCoins ? 'block' : 'none' }}
    >
      {matchedCoins.map((coin: any) => (
        <div
          key={coin.id}
          className="coin"
          onClick={() => setChosenCoin(coin.name)}
        >
          <img src={coin.thumb} alt={coin.name} />
          <span>{coin.name}</span>
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
};

export default AvailableCoins;
