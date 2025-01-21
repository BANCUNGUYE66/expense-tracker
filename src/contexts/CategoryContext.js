import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories(prev => [...prev, { ...category, id: Date.now() }]);
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updatedCategory } : category
    ));
  };

  const addSubcategory = (categoryId, subcategory) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        const subcategories = category.subcategories || [];
        return {
          ...category,
          subcategories: [...subcategories, { ...subcategory, id: Date.now() }]
        };
      }
      return category;
    }));
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      addCategory,
      deleteCategory,
      updateCategory,
      addSubcategory,
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () => useContext(CategoryContext); 