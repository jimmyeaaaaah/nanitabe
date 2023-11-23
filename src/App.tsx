import { useEffect, useState } from "react";
import FoodList from "./components/FoodIndex";
import FoodForm from "./components/FoodForm";
import RecipeList from "./components/RecipeIndex";
import RecipeSearch from "./components/RecipeSearch";
import { FoodProps, RecipeSearchConditionProps } from "./entity/entity";
import { fetchFoods, addFood, deleteFood, fetchRecipes } from "./api/foods";

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
      <h1>冷蔵庫の中身</h1>
      <FoodList
        foods={foods}
        onDeleteFood={handleDeleteFood}
        onAddIngredient={handleAddIngredient}
      />
      <h2>冷蔵庫に食材を追加</h2>
      <FoodForm onAddFood={handleAddFood} />
      <h2>レシピを検索</h2>
      <RecipeSearch
        ingredients={ingredients}
        onSetRecipeSearchCondition={handleRecipeSearch}
      />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
