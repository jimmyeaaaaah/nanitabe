import React, { useEffect, useState } from "react";
import FoodList from "./components/FoodIndex";
import FoodForm from "./components/FoodForm";
import { FoodProps } from "./entity/entity";
import { fetchFoods, addFood, deleteFood } from "./api/foods";

function App() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

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

  return (
    <div>
      <h1>冷蔵庫の中身</h1>
      <FoodList foods={foods} onDeleteFood={handleDeleteFood} />
      <FoodForm onAddFood={handleAddFood} />
    </div>
  );
}

export default App;
