

const formatAssetName = (asset: string) => {
    return asset.trim().toLowerCase().replace(/\s+/g, "-");
  };
  
export  const fetchCryptoPrice = async (asset: string) => {
    const formattedAsset = formatAssetName(asset);
    console.log("Formatted Asset Name:", formattedAsset);
  
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${formattedAsset}&vs_currencies=usd`
      );
      const data = await response.json();
  
      console.log("API Response:", data);
  
      return data[formattedAsset]?.usd || 0;
    } catch (error) {
      console.error("Error fetching price:", error);
      return 0;
    }
  };
  