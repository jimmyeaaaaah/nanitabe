import React from "react";

interface RecipeListProps {
  recipes: string[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div>
      <h2>レシピ一覧</h2>
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
