import React, { useContext, useEffect, useRef, useState } from "react";
import OverviewChart from "./Charts/OverviewChart";
import "./Overview.css";
import { toast } from "sonner";
import axios from "axios";
import { CryptoContext } from "../../../../contexts/CryptoContext";

const OverviewContainer: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [marketTrends, setMarketTrends] = useState<{ [key: string]: number[] }>({});
  const cryptosContext = useContext(CryptoContext);
  const cryptos = cryptosContext.crypto;
  const fetchedRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchMarketData = async () => {
      if (fetchedRef.current) return;
      try {

        const allCryptosIds = cryptos.map((crypto) => crypto.coinId);
        if (allCryptosIds.length === 0) throw new Error("You have no available crypto");

        let marketData: { [key: string]: number[] } = {};
        let commonDates: string[] = [];

        for (const coinId of allCryptosIds) {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
          );

          const prices = response.data.prices.map((entry: any) => entry[1]); // Get prices
          const priceDates = response.data.prices.map((entry: any) =>
            new Date(entry[0]).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })
          );

          if (commonDates.length === 0) commonDates = priceDates;

          marketData[coinId] = prices;
        }

        setMarketTrends(marketData);
        setDates(commonDates);

        toast.success("Market data fetched successfully");
        fetchedRef.current = true;
      } catch (error: any) {
        if (error.message === "You have no available crypto") {
          toast.warning(error.message);
          return;
        }
        console.log(error.message);
        toast.error("Error fetching market data");
        fetchedRef.current = true;
      }
    };

    fetchMarketData();
  }, [cryptos]);

  const options = {
    title: {
      text: "Crypto Market Trends",
      left: "center",
      show: true,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: dates,
      show: true,
    },
    yAxis: {
      show: true,
      type: "value",
    },
    series: Object.keys(marketTrends).map((coinId) => ({
      name: coinId.toUpperCase(),
      type: "line",
      data: marketTrends[coinId],
      smooth: true,
    })),
  };

  return (
    <div className="overview-container">
      <div className="header">
        <h2>Dashboard</h2>
        <span>Dashboard / Crypto Overview</span>
      </div>
      <div className="charts-container">
        <OverviewChart option={options} />
      </div>
    </div>
  );
};

export default OverviewContainer;
