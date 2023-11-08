import React, { useState } from "react";
import { FoodProps } from "../entity/entity"; 

interface FoodFormProps {
  onAddFood: (newFood: FoodProps) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onAddFood }) => {
  const [newFood, setNewFood] = useState<FoodProps>({ // newFoodの初期値をFoodProps型のオブジェクトに設定
    type: "",
    name: "",
    amount: 0,
    unit: ""
  });

  const handleAddFood = () => {
    if (newFood.name) {
        // onAddFoodの関数は、App.tsx内で定義されFoodFormを呼び出すときに渡されてる
        onAddFood(newFood);
        // 入力フィールドをクリア
        setNewFood({
            type: "",
            name: "",
            amount: 0,
            unit: ""
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newFood.type}
        onChange={(e) => setNewFood({...newFood, type: e.target.value})}
      />
      <input
        type="text"
        value={newFood.name}
        onChange={(e) => setNewFood({...newFood, name: e.target.value})}
      />
      <input
        type="number"
        value={newFood.amount}
        onChange={(e) => setNewFood({...newFood, amount: parseInt(e.target.value, 10)})}
      />
      <input
        type="text"
        value={newFood.unit}
        onChange={(e) => setNewFood({...newFood, unit: e.target.value})}
      />
      <button onClick={handleAddFood}>追加</button>
    </div>
  );
};

export default FoodForm;