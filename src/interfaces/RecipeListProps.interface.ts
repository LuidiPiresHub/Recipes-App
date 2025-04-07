import { Recipe } from './Recipe.interface';

export interface RecipeListProps {
  title: string;
  recipes: Recipe[] | null;
  emptyMessage: string;
}
