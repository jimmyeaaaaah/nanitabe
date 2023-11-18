import React, { useState } from "react";
import { FoodProps } from "../entity/entity";

interface FoodFormProps {
  onAddFood: (newFood: FoodProps) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onAddFood }) => {
  const [newFood, setNewFood] = useState<FoodProps>({
    id: 0,
    type: "vegetable",
    name: "",
    amount: 0,
    unit: "piece",
  });

  const handleAddFood = () => {
    console.log(newFood);
    if (newFood.name) {
      // onAddFoodの関数は、App.tsx内で定義されFoodFormを呼び出すときに渡されてる
      onAddFood(newFood);
      // 入力フィールドをクリア
      setNewFood({
        id: 0,
        type: "",
        name: "",
        amount: 0,
        unit: "piece",
      });
    }
  };

  return (
    <div>
      <select
        value={newFood.type}
        onChange={(e) => {
          setNewFood({ ...newFood, type: e.target.value });
        }}
      >
        <option value="vegetable">野菜</option>
        <option value="meet">肉</option>
        <option value="other">その他</option>
      </select>
      <input
        type="text"
        value={newFood.name}
        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
      />
      <input
        type="number"
        value={newFood.amount}
        onChange={(e) =>
          setNewFood({ ...newFood, amount: parseInt(e.target.value, 10) })
        }
      />
      <select
        value={newFood.unit}
        onChange={(e) => setNewFood({ ...newFood, unit: e.target.value })}
      >
        <option value="piece">個数</option>
        <option value="gram">グラム</option>
      </select>
      <button onClick={handleAddFood}>追加</button>
    </div>
  );
};

export default FoodForm;
