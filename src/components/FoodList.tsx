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
    meet: [],
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
      {groupedFoods["vegetable"].length > 0 ? (
        <div>
          <h3>野菜</h3>
          <ul>
            {groupedFoods["vegetable"].map((food, index) => (
              <li key={index}>
                {food.name} : {food.amount} {food.unit === "piece" ? "個" : "g"}
                <button onClick={() => onDeleteFood(food.id)}>削除</button>
                <button onClick={() => onAddIngredient(food.name)}>
                  この食材を使う
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>野菜</h3>
          <p>食材がありません</p>
        </div>
      )}
      {groupedFoods["meet"].length > 0 ? (
        <div>
          <h3>肉</h3>
          <ul>
            {groupedFoods["meet"].map((food, index) => (
              <li key={index}>
                {food.name} : {food.amount} {food.unit === "piece" ? "個" : "g"}
                <button onClick={() => onDeleteFood(food.id)}>削除</button>
                <button onClick={() => onAddIngredient(food.name)}>
                  この食材を使う
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>肉</h3>
          <p>食材がありません</p>
        </div>
      )}
      {groupedFoods["other"].length > 0 ? (
        <div>
          <h3>その他</h3>
          <ul>
            {groupedFoods["other"].map((food, index) => (
              <li key={index}>
                {food.name} : {food.amount} {food.unit === "piece" ? "個" : "g"}
                <button onClick={() => onDeleteFood(food.id)}>削除</button>
                <button onClick={() => onAddIngredient(food.name)}>
                  この食材を使う
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>その他</h3>
          <p>食材がありません</p>
        </div>
      )}
    </div>
  );
};

export default FoodList;
