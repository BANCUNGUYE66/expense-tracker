import { createContext, useContext, useState } from 'react';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    ));
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      updateTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext); 