import React, { useEffect, useState } from "react";
import FoodList from "./components/FoodIndex";
import FoodForm from "./components/FoodForm";
import { FoodProps } from "./entity/entity";
// import { getFoods } from "./api/foods";

function App() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8080/api/foods");
      const jsonData = await result.json();
      setFoods(jsonData);
    };
    fetchData();
  }, []);

  const addFood = (newFood: FoodProps) => {
    setFoods([...foods, newFood]);
  };

  const deleteFood = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/foods/${id}`, {
        method: "DELETE",
      });

      const result = await fetch("http://localhost:8080/api/foods");
      const jsonData = await result.json();
      setFoods(jsonData);
    } catch (error) {
      console.error("Error deleting food: ", error);
    }
  };

  return (
    <div>
      <h1>冷蔵庫の中身</h1>
      <FoodList foods={foods} onDeleteFood={deleteFood} />
      <FoodForm onAddFood={addFood} />
    </div>
  );
}

export default App;
