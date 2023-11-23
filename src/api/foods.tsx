import { FoodProps, RecipeSearchConditionProps } from "../entity/entity";

export const addFood = async (newFood: FoodProps) => {
  try {
    await fetch(`http://localhost:8080/api/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    });

    return await fetchFoods();
  } catch (error) {
    console.error("Error adding food:", error);
    throw error;
  }
};

export const deleteFood = async (id: number) => {
  try {
    await fetch(`http://localhost:8080/api/foods/${id}`, {
      method: "DELETE",
    });

    return await fetchFoods();
  } catch (error) {
    console.error("Error deleting food: ", error);
    throw error;
  }
};

export const fetchFoods = async () => {
  try {
    const result = await fetch("http://localhost:8080/api/foods");
    return await result.json();
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export const fetchRecipes = async (
  recipeSearchCondition: RecipeSearchConditionProps
) => {
  try {
    // queryParamsを通してingredientsをURLに組み込む
    const queryParams = new URLSearchParams({
      keyword: recipeSearchCondition.ingredients.join(","),
    });
    const response = await fetch(
      `http://localhost:5000/api/search?${queryParams.toString()}`
    );
    const data = await response.json();
    return data.urls;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
