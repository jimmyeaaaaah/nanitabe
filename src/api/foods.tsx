import { FoodProps } from "../entity/entity";

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
    const result = await fetch("http://localhost:8080/api/foods")
    return await result.json();
  } catch (error){
    console.error("Error fetching foods:", error);
    throw error
  }
}
