import React, { useState } from "react";
import RecipeForm from "./RecipeForm";
import { Recipe } from "../types";
import { useAppContext } from "../context/app-provider";

interface RecipeItemProps {
  recipe: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  const { deleteRecipe, updateRecipe } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedRecipe: Omit<Recipe, "id">) => {
    updateRecipe(recipe.id, updatedRecipe);
    setIsEditing(false);
  };

  if (isEditing) {
    return <RecipeForm initialData={recipe} onSubmit={handleUpdate} />;
  }

  return (
    <div className='recipe-item'>
      <h2>{recipe.title}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
    </div>
  );
};

export default RecipeItem;
