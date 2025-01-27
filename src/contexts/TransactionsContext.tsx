import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase-init';
import { toast } from 'sonner';
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
    const fetchTransactions = async () => {
      try {
        const username = auth.currentUser?.displayName;
        if (!username) {
          throw new Error('Please login to view transactions');
        }
        const userRef = doc(db, 'users', username.toLowerCase());
        const transactionsSnap = await getDoc(userRef);
        if (transactionsSnap.exists()) {
          const transactionsData = transactionsSnap.data();
          console.log(transactionsData);
          setTransactions(transactionsData.transactions);
        } else {
          throw new Error('No transactions found');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTransactions();
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
