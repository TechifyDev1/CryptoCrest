import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase-init';
import { doc, onSnapshot } from 'firebase/firestore';

const CryptoContext = createContext<{
  crypto: { asset: string; value: number }[];
}>({
  crypto: [],
});
const CryptoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [coins, setCoins] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        const unsubscribeCurrency = onSnapshot(
          doc(db, 'currencies', user.displayName.toLowerCase()),
          (doc) => {
            const data = doc.data(); // Get the document data
            if (data) {
              const coinsArray = Object.keys(data).map((key) => ({
                id: key, // The cryptocurrency key (e.g., "bitcoin", "fasttoken")
                ...data[key], // Spread its details (balance, name, price)
              }));

              setCoins(coinsArray);
            }
          }
        );

        return unsubscribeCurrency;
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <CryptoContext.Provider value={{ crypto: coins }}>
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoContextProvider };
