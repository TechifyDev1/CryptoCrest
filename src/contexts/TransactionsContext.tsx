import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase-init';
import { Transaction } from '../type';

interface TransactionContextType {
  transactions: Transaction[];
}

const transactionContext = createContext<TransactionContextType>({
  transactions: [],
});

const TransactionsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        // When the user is authenticated, set up the snapshot listener
        const userDocRef = doc(db, 'users', user.displayName.toLowerCase());
        const unsubscribeTransactions = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && Array.isArray(data.transactions)) {
              setTransactions(data.transactions);
            }
          }
        });

        // Cleanup function for `onSnapshot`
        return () => unsubscribeTransactions();
      } else {
        // If user is not authenticated, clear the transactions
        setTransactions([]);
      }
    });

    // Cleanup function for `auth.onAuthStateChanged`
    return () => unsubscribeAuth();
  }, []); // Ensure the effect runs once and watches auth state changes

  return (
    <transactionContext.Provider value={{ transactions }}>
      {children}
    </transactionContext.Provider>
  );
};

export { TransactionsContextProvider, transactionContext };
