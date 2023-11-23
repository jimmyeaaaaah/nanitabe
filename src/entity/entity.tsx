export interface FoodProps {
  id: number;
  type: string; // 種類: 野菜, 肉, その他
  name: string; // 食材名: にんじん, 鶏肉
  amount: number; // 量: 1個, 200g
  unit: string; // 量の単位: 個, g
}

export interface RecipeSearchConditionProps {
  ingredients: string[];
  servings: number;
}