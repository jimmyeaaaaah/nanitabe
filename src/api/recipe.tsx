import { RecipeSearchConditionProps, RecipeProps } from "../entity/entity";

export const fetchRecipeIDs = async (
  recipeSearchCondition: RecipeSearchConditionProps
) => {
  try {
    // queryParamsを通してingredientsをURLに組み込む
    const queryParams = new URLSearchParams({
      keyword: recipeSearchCondition.ingredients.join(","),
    });
    const response = await fetch(
      `http://localhost:5000/api/recipe/search?${queryParams.toString()}`
    );
    const data = await response.json();
    return data.ids;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const fetchRecipeDetails = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/recipe/details?id=${id}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch recipe details. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};
