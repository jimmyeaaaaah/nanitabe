import { FoodProps } from "../entity/entity";

export function getFoods() {
  return fetch("http://localhost:8080/api/foods")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json() as Promise<FoodProps[]>;
    })
    .then((data) => {
        const foods: FoodProps[] = data.map((item: FoodProps) => ({
            id: item.id,
            type: item.type,
            name: item.name,
            amount: item.amount,
            unit: item.unit,
        }));
        return foods;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      return [];
    });
}
