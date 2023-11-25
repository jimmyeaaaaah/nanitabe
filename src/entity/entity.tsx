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

export interface IngredientProps {
  ingredient_id: number;
  ingredient_title: string;
  ingredient_name: string;
  ingredient_amount: string;
}

export interface InstructionProps {
  index: number;
  body: string;
}

export interface RecipeProps {
  recipe_id: string;
  recipe_name: string;
  serving: number;
  calorie: number | null;
  cooking_time: number;
  expense: number;
  img_large_url: string;
  img_normal_url: string;
  img_small_url: string;
  ingredient_list: IngredientProps[];
  instruction_list: InstructionProps[];
  introduction: string;
  rating_count: number;
  video_url: string;
}
