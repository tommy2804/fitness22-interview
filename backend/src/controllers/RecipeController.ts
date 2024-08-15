import { Request, Response } from "express";
import { RecipeService } from "../services/RecipeService";

export class RecipeController {
  private recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  getAllRecipes = (req: Request, res: Response) => {
    const recipes = this.recipeService.getAllRecipes();
    res.json(recipes);
  };

  createRecipe = (req: Request, res: Response) => {
    const newRecipe = this.recipeService.createRecipe(req.body);
    res.status(201).json(newRecipe);
  };

  updateRecipe = (req: Request, res: Response) => {
    const updatedRecipe = this.recipeService.updateRecipe(req.params.id, req.body);
    if (updatedRecipe) {
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  };

  deleteRecipe = (req: Request, res: Response) => {
    const success = this.recipeService.deleteRecipe(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  };
}
