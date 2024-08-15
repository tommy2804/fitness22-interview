import React, { useState } from "react";
import { Recipe } from "../types";
import { Button, TextField } from "@mui/material";

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (recipe: Omit<Recipe, "id">) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [ingredients, setIngredients] = useState(initialData?.ingredients.join("\n") || "");
  const [steps, setSteps] = useState(initialData?.steps.join("\n") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      ingredients: ingredients.split("\n").filter(Boolean),
      steps: steps.split("\n").filter(Boolean),
    });
    if (!initialData) {
      setTitle("");
      setIngredients("");
      setSteps("");
    }
  };

  return (
    <div>
      <TextField
        label='Title'
        variant='outlined'
        fullWidth
        name='title'
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Recipe Title'
        value={title}
        required
      />
      <div className='form-container'>
        <TextField
          variant='outlined'
          fullWidth
          name='ingredients'
          onChange={(e) => setIngredients(e.target.value)}
          placeholder='Ingredients (one per line)'
          value={ingredients}
          required
          multiline
        />
        <TextField
          variant='outlined'
          fullWidth
          name='steps'
          onChange={(e) => setSteps(e.target.value)}
          placeholder='Steps (one per line)'
          value={steps}
          required
          multiline
        />
        <Button onClick={handleSubmit}>{initialData ? "Update Recipe" : "Add Recipe"}</Button>
      </div>
    </div>
  );
};

export default RecipeForm;
