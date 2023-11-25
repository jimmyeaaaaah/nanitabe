import React from "react";
import { RecipeProps } from "../entity/entity";
import { Link } from "react-router-dom";
import "../styles/RecipeList.css";

interface RecipeListProps {
  recipes: RecipeProps[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="recipe-list">
      <div className="recipe-columns">
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className="recipe-item">
            <h5 style={{ whiteSpace: "pre-wrap" }}>{recipe.recipe_name.replace(/ /g, '\n')}</h5>
            <a
              href={`https://www.kurashiru.com/recipes/${recipe.recipe_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={recipe.img_small_url} alt={recipe.recipe_name} />
            </a>
            <p>
              <small className="">
                出典:{" "}
                <a
                  href="https://www.kurashiru.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  クラシル
                </a>
              </small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
