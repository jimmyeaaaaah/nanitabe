import { useEffect, useState } from "react";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import RecipeList from "./components/RecipeList";
import RecipeSearch from "./components/RecipeSearch";
import {
  FoodProps,
  RecipeProps,
  RecipeSearchConditionProps,
} from "./entity/entity";
import { fetchFoods, addFood, deleteFood } from "./api/foods";
import { fetchRecipeIDs, fetchRecipeDetails } from "./api/recipe";
import "./styles/App.css";

function App() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchFoods();
        setFoods(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAddFood = async (newFood: FoodProps) => {
    try {
      const jsonData = await addFood(newFood);
      setFoods(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFood = async (id: number) => {
    try {
      const jsonData = await deleteFood(id);
      setFoods(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIngredient = async (ingredient: string) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const handleClearIngredients = async () => {
    setIngredients([]);
  };

  const handleRecipeSearch = async (
    recipeSearchCondition: RecipeSearchConditionProps
  ) => {
    try {
      const recipeIDs = await fetchRecipeIDs(recipeSearchCondition);
      for (const recipeID of recipeIDs.slice(0, 5)) {
        const jsonData = await fetchRecipeDetails(recipeID);
        setRecipes((prevRecipes) => [...prevRecipes, jsonData]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>冷蔵庫の中身</h3>
      <div className="refrigerator">
        <FoodForm onAddFood={handleAddFood} />
        <FoodList
          foods={foods}
          onDeleteFood={handleDeleteFood}
          onAddIngredient={handleAddIngredient}
        />
      </div>
      <h3>レシピを検索</h3>
      <RecipeSearch
        ingredients={ingredients}
        onClearIngredients={handleClearIngredients}
        onSetRecipeSearchCondition={handleRecipeSearch}
      />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
