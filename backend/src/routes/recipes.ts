import express from "express";
import { RecipeController } from "../controllers/RecipeController";

const router = express.Router();
const recipeController = new RecipeController();

router.get("/", recipeController.getAllRecipes);
router.post("/", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

export const recipesRouter = router;
