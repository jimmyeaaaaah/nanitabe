import { useEffect, useState } from "react";
import FoodList from "./components/FoodIndex";
import FoodForm from "./components/FoodForm";
import RecipeSearch from "./components/RecipeSearch";
import { FoodProps, RecipeSearchConditionProps } from "./entity/entity";
import { fetchFoods, addFood, deleteFood } from "./api/foods";

function App() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [searchResult, setSearchResult] = useState<string[]>([]);

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
      // queryParamsを通してingredientsをURLに組み込む
      const queryParams = new URLSearchParams({
        keyword: recipeSearchCondition.ingredients.join(","),
      });
      const response = await fetch(
        `http://localhost:5000/api/search?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResult(data.urls);
      console.log(searchResult);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>冷蔵庫の中身</h1>
      <FoodList foods={foods} onDeleteFood={handleDeleteFood} />
      <h2>冷蔵庫に食材を追加</h2>
      <FoodForm onAddFood={handleAddFood} />
      <h2>レシピを検索</h2>
      <RecipeSearch onSetRecipeSearchCondition={handleRecipeSearch} />
    </div>
  );
}

export default App;
