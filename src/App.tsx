import { useEffect, useState } from "react";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import RecipeList from "./components/RecipeList";
import RecipeSearch from "./components/RecipeSearch";
import { FoodProps, RecipeSearchConditionProps } from "./entity/entity";
import { fetchFoods, addFood, deleteFood, fetchRecipes } from "./api/foods";
import './styles/App.css'

function App() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<string[]>([]);

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

  const handleRecipeSearch = async (
    recipeSearchCondition: RecipeSearchConditionProps
  ) => {
    try {
      const recipeURLs = await fetchRecipes(recipeSearchCondition);
      setRecipes(recipeURLs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIngredient = async (ingredient: string) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    console.log(ingredient)
  };

  return (
    <div>
      <h2>冷蔵庫の中身</h2>
      <FoodList
        foods={foods}
        onDeleteFood={handleDeleteFood}
        onAddIngredient={handleAddIngredient}
      />
      <h3>冷蔵庫に食材を追加</h3>
      <FoodForm onAddFood={handleAddFood} />
      <h3>レシピを検索</h3>
      <RecipeSearch
        ingredients={ingredients}
        onSetRecipeSearchCondition={handleRecipeSearch}
      />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
