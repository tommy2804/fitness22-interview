import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../models/Recipe";

export class RecipeService {
  private recipes: Recipe[] = [];

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  createRecipe(recipeData: Omit<Recipe, "id">): Recipe {
    const newRecipe: Recipe = {
      id: uuidv4(),
      ...recipeData,
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  updateRecipe(id: string, recipeData: Partial<Recipe>): Recipe | null {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...recipeData };
      return this.recipes[index];
    }
    return null;
  }

  deleteRecipe(id: string): boolean {
    const initialLength = this.recipes.length;
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    return this.recipes.length !== initialLength;
  }
}
