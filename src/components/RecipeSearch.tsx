import React, { useState, useEffect } from "react";
import { RecipeSearchConditionProps } from "../entity/entity";
import "../styles/RecipeSearch.css";

interface RecipeSearchProps {
  ingredients: string[];
  onClearIngredients: () => void;
  onSetRecipeSearchCondition: (
    RecipeSearchCondition: RecipeSearchConditionProps
  ) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({
  ingredients,
  onClearIngredients,
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
    onClearIngredients();
    setRecipeSearchCondition(initialRecipeSearchCondition);
    console.log(recipeSearchCondition.ingredients);
  };

  return (
    <div className="recipe-search">
      <div>
        <div className="recipe-form">
          <div className="ingredients">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <button onClick={handleAddIngredient}>食材を追加</button>
          </div>
          <div className="servings">
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
          </div>
          <div className="clear">
            <button onClick={handleClearRecipeSearchCondition}>
              条件をクリア
            </button>
          </div>
        </div>
        <div className="current-ingredients">
          <div className="title">現在の食材</div>
          <div className="ingredient-tags">
            {recipeSearchCondition.ingredients.map((ingredient, index) => (
              // タグの削除ボタンをつける
              <span key={index} className="ingredient-tag">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
        <div className="search">
          {/* 食材がからの時にエラーを吐く */}
          <button onClick={handleAddRecipeSearchCondition}>
            この条件で検索
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
