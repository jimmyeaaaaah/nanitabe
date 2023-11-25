// FoodList.js

import React from "react";
import { FoodProps } from "../entity/entity";
import "../styles/FoodList.css";

interface FoodListProps {
  foods: FoodProps[];
  onDeleteFood: (id: number) => void;
  onAddIngredient: (ingredient: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({
  foods,
  onDeleteFood,
  onAddIngredient,
}) => {
  const groupedFoods: { [key: string]: FoodProps[] } = {
    vegetable: [],
    meat: [],
    other: [],
  };
  if (foods) {
    foods.forEach((food) => {
      if (groupedFoods[food.type]) {
        groupedFoods[food.type].push(food);
      } else {
        groupedFoods["other"].push(food); // 不明な食材タイプの場合、"other" エリアに追加
      }
    });
  }

  return (
    <div className="food-list">
      {Object.keys(groupedFoods).map((category, index) => (
        <div key={index} className="food-category">
          <h4>
            {category === "vegetable"
              ? "野菜 🥬"
              : category === "meat"
              ? "肉 🥩"
              : category === "other"
              ? "その他 🥚"
              : ""}
          </h4>
          <ul>
            {groupedFoods[category].map((food, foodIndex) => (
              <li key={foodIndex} className="food-item">
                <div className="food-name">{food.name}</div>
                <div className="food-amount">
                  {food.amount} {food.unit === "piece" ? "個" : "g"}
                </div>
                <div className="buttons">
                  <button onClick={() => onDeleteFood(food.id)}>削除</button>
                  <button onClick={() => onAddIngredient(food.name)}>
                    食材を使う
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
