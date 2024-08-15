import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";

import "../src/shared/styles.scss";
import { Container } from "@mui/material";
import { useAppContext } from "./context/app-provider";

const App: React.FC = () => {
  const { recipes, addRecipe } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedRecipes = [...filteredRecipes].sort((a, b) =>
    sortAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}>
      <h1>Recipe Management</h1>
      <RecipeForm onSubmit={addRecipe} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <button onClick={() => setSortAscending(!sortAscending)}>
        Sort {sortAscending ? "Descending" : "Ascending"}
      </button>
      <RecipeList recipes={sortedRecipes} />
    </Container>
  );
};

export default App;
