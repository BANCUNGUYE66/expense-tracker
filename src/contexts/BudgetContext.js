import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState([]);

  const addBudget = (budget) => {
    setBudgets(prev => [...prev, { ...budget, id: Date.now(), spent: 0 }]);
  };

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  const updateBudget = (id, updatedBudget) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id ? { ...budget, ...updatedBudget } : budget
    ));
  };

  const updateSpentAmount = (categoryId, amount) => {
    setBudgets(prev => prev.map(budget => {
      if (budget.categoryId === categoryId) {
        const newSpent = budget.spent + amount;
        if (newSpent > budget.limit) {
          toast.warning(`Budget limit exceeded for ${budget.name}!`);
        }
        return { ...budget, spent: newSpent };
      }
      return budget;
    }));
  };

  return (
    <BudgetContext.Provider value={{
      budgets,
      addBudget,
      deleteBudget,
      updateBudget,
      updateSpentAmount,
    }}>
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudgets = () => useContext(BudgetContext); 