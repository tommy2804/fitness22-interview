import React from "react";
import RecipeItem from "./RecipeItem";
import { useAppContext } from "../context/app-provider";
import { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
}
const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const { loading, error } = useAppContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
