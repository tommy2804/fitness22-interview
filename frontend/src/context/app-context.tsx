// src/context/AppContext.tsx

import { createContext } from "react";
import { Recipe } from "../types";

interface AppContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  loading: boolean;
  error: string | null;
}

export const AppContext = createContext<AppContextType>({
  recipes: [],
  addRecipe: () => {},
  updateRecipe: () => {},
  deleteRecipe: () => {},
  loading: false,
  error: null,
});
