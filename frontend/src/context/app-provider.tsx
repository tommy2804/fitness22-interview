// src/context/AppProvider.tsx

import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./app-context";
import { Recipe } from "../types";
import {
  getAllRecipes,
  createRecipe,
  updateRecipe as updateRecipeAPI,
  deleteRecipe as deleteRecipeAPI,
} from "../api";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const fetchedRecipes = await getAllRecipes();
      setRecipes(fetchedRecipes);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (recipe: Omit<Recipe, "id">) => {
    setLoading(true);
    try {
      const newRecipe = await createRecipe(recipe);
      setRecipes((prev) => [...prev, newRecipe]);
      setError(null);
    } catch (err) {
      setError("Failed to add recipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id: string, recipeUpdate: Partial<Recipe>) => {
    setLoading(true);
    try {
      const updatedRecipe = await updateRecipeAPI(id, recipeUpdate);
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update recipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id: string) => {
    setLoading(true);
    try {
      await deleteRecipeAPI(id);
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete recipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
