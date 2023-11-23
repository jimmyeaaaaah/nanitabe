import React, { createContext, useContext, useState } from "react";
import { RecipeSearchConditionProps } from "./entity/entity";

const RecipeSearchContext = createContext();

export const RecipeSearchProvider = ({ children }) => {
  const initialRecipeSearchCondition = {
    ingredients: [],
    servings: 2,
  };
  const [recipeSearchCondition, setRecipeSearchCondition] =
    useState<RecipeSearchConditionProps>(initialRecipeSearchCondition);

  return (
    <RecipeSearchContext.Provider
      value={{ recipeSearchCondition, setRecipeSearchCondition }}
    >
      {children}
    </RecipeSearchContext.Provider>
  );
};

export const useRecipeSearchContext = () => {
  return useContext(RecipeSearchContext);
};
