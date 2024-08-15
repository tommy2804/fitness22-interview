import axios from "axios";
import { Recipe } from "./types";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const getAllRecipes = async () => {
  try {
    const response = await api.get("recipes/");
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch recipes: ${error}`);
    return [];
  }
};

export const createRecipe = async (recipe: Omit<Recipe, "id">): Promise<Recipe> => {
  const response = await api.post(`recipes/`, recipe);
  return response.data;
};

export const updateRecipe = async (id: string, recipe: Partial<Recipe>): Promise<Recipe | null> => {
  const response = await api.put(`recipes/${id}/`, recipe);
  return response.data;
};

export const deleteRecipe = async (id: string): Promise<boolean> => {
  await api.delete(`recipes/${id}`);
  return true;
};
