import React, { useState } from "react";
import FoodList from "./components/FoodIndex";
import FoodForm from "./components/FoodForm";
import { FoodProps } from "./entity/entity";

function App() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  const addFood = (newFood: FoodProps) => {
    setFoods([...foods, newFood]);
  };

  const deleteFood = (index: number) => {
    const updatedFoods = foods.filter((_, i) => i !== index);
    setFoods(updatedFoods);
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