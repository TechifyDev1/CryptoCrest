import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase-init';
import { Transaction } from '../type';

interface TransactionContextType {
  transactions: Transaction[];
}

const transactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

const TransactionsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
    let unsubscribeTransactions: () => void = () => {};

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        unsubscribeTransactions = onSnapshot(
          doc(db, 'users', user.displayName.toLowerCase()),
          (doc) => {
            const data = doc.data();
            if (data) {
              setTransactions(data.transactions);
            }
          }
        );
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <transactionContext.Provider value={{ transactions }}>
      {children}
    </transactionContext.Provider>
  );
};

export { TransactionsContextProvider, transactionContext };
