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
  likeRecipe: (externalRecipe: any) => void;
}

// Fallback context values: used when no RecipeProvider wraps the app
const initialContext: RecipeContextType = {
  recipes: [],
  addRecipe: () => {
    console.warn('addRecipe() not implemented');
  },
  likeRecipe: () => {
    console.warn('likeRecipe() not implemented');
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
  
  const likeRecipe = (externalRecipe: any) => {
    // Checks if recipe with this ID already exists
    const exists = recipes.some(recipe => recipe.id === externalRecipe.idMeal);
    if (exists) return; // Don't add duplicates
    
    // Converts external recipe format to recipe type
    const newRecipe: Recipe = {
      id: externalRecipe.idMeal,
      name: externalRecipe.strMeal,
      description: externalRecipe.strCategory,
      imageUri: externalRecipe.strMealThumb
    };
    
    // Adds to recipes
    addRecipe(newRecipe);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, likeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
