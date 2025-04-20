import React, { createContext, useState, ReactNode, JSX } from 'react';

export type Recipe = {
  id: string;
  name: string;
  description: string;
  imageUri: string;
};

export interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
}

// initial dummy context
const initialContext: RecipeContextType = {
  recipes: [],
  addRecipe: () => {
    console.warn('addRecipe() not implemented');
  },
};

export const RecipeContext = createContext<RecipeContextType>(initialContext);

type RecipeProviderProps = {
  children: ReactNode;
};

// Provider component managing recipe state
export const RecipeProvider = ({ children }: RecipeProviderProps): JSX.Element => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
