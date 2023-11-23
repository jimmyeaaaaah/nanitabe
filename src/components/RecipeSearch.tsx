import React, { useState, useEffect } from "react";
import { RecipeSearchConditionProps } from "../entity/entity";
import "../styles/RecipeSearch.css"

interface RecipeSearchProps {
  ingredients: string[];
  onSetRecipeSearchCondition: (
    RecipeSearchCondition: RecipeSearchConditionProps
  ) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({
  ingredients,
  onSetRecipeSearchCondition,
}) => {
  const initialRecipeSearchCondition: RecipeSearchConditionProps = {
    ingredients: [],
    servings: 2,
  };
  const [recipeSearchCondition, setRecipeSearchCondition] =
    useState<RecipeSearchConditionProps>(initialRecipeSearchCondition);
  const [newIngredient, setNewIngredient] = useState<string>("");

  useEffect(() => {
    setRecipeSearchCondition((prevCondition) => {
      const ingredientsSet = new Set([
        ...prevCondition.ingredients,
        ...ingredients,
      ]);
      return {
        ...prevCondition,
        ingredients: Array.from(ingredientsSet),
      };
    });
  }, [ingredients]);

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

  const handleClearRecipeSearchCondition = () => {
    setRecipeSearchCondition(initialRecipeSearchCondition);
  };

  return (
    <div className="recipe-search">
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
          <button onClick={handleClearRecipeSearchCondition}>
            条件をクリア
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
