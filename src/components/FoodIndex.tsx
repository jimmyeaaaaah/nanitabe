import React from "react";
import { FoodProps } from "../entity/entity";

interface FoodListProps {
  foods: FoodProps[];
  onDeleteFood: (id: number) => void;
}

const FoodList: React.FC<FoodListProps> = ({ foods, onDeleteFood }) => {
  const groupedFoods: { [key: string]: FoodProps[] } = {
    vegetable: [],
    meet: [],
    other: [],
  };
  foods.forEach((food) => {
    if (groupedFoods[food.type]) {
      groupedFoods[food.type].push(food);
    } else {
      groupedFoods["other"].push(food); // 不明な食材タイプの場合、"other" エリアに追加
    }
  });

  return (
    <div>
      {groupedFoods["vegetable"].length > 0 ? (
        <div>
          <h2>野菜</h2>
          <ul>
            {groupedFoods["vegetable"].map((food, index) => (
              <li key={index}>
                {food.name} ({food.amount} {food.unit})
                <button onClick={() => onDeleteFood(food.id)}>削除</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>野菜</h2>
          <p>食材がありません</p>
        </div>
      )}
      {groupedFoods["meet"].length > 0 ? (
        <div>
          <h2>肉</h2>
          <ul>
            {groupedFoods["meet"].map((food, index) => (
              <li key={index}>
                {food.name} ({food.amount} {food.unit})
                <button onClick={() => onDeleteFood(food.id)}>削除</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>肉</h2>
          <p>食材がありません</p>
        </div>
      )}
      {groupedFoods["other"].length > 0 ? (
        <div>
          <h2>その他</h2>
          <ul>
            {groupedFoods["other"].map((food, index) => (
              <li key={index}>
                {food.name} ({food.amount} {food.unit})
                <button onClick={() => onDeleteFood(food.id)}>削除</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>その他</h2>
          <p>食材がありません</p>
        </div>
      )}
    </div>
  );
};

export default FoodList;
