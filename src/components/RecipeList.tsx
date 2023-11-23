import React from "react";
import "../styles/RecipeList.css"

interface RecipeListProps {
  recipes: string[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="recipe-list">
      <h3>レシピ一覧</h3>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <a href={recipe} target="_blank" rel="noopener noreferrer">
              レシピ {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
