import React, { useState } from "react";
import { RecipeSearchConditionProps } from "../entity/entity";

interface RecipeSearchProps {
  onSetRecipeSearchCondition: (
    RecipeSearchCondition: RecipeSearchConditionProps
  ) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({
  onSetRecipeSearchCondition,
}) => {
  const [recipeSearchCondition, setRecipeSearchCondition] =
    useState<RecipeSearchConditionProps>({
      ingredients: [],
      servings: 0,
    });
  const [newIngredient, setNewIngredient] = useState<string>("");

  const handleAddIngredient = () => {
    setRecipeSearchCondition((prevCondition) => ({
      ...prevCondition,
      ingredients: [...prevCondition.ingredients, newIngredient],
    }));
    setNewIngredient("");
  };

  const handleAddRecipeSearchCondition = () => {
    onSetRecipeSearchCondition(recipeSearchCondition);
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <button onClick={handleAddIngredient}>入れる食材を追加</button>
        </div>
        <div>現在の食材: {recipeSearchCondition.ingredients.join(", ")}</div>
        <div>
          <input
            type="number"
            value={recipeSearchCondition.servings}
            onChange={(e) => {
              setRecipeSearchCondition({
                ...recipeSearchCondition,
                servings: Number(e.target.value),
              });
            }}
          />
          <span> 人前</span>
          <button onClick={handleAddRecipeSearchCondition}>
            この条件で検索
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
