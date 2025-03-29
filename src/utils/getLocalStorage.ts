import { Recipe } from '../interfaces/Recipe.interface';

export const getDoneRecipes = (): Recipe[] | null => {
  const allFinishedRecipes: Recipe[] | null = JSON.parse(localStorage.getItem('doneRecipes')!)
  return allFinishedRecipes;
}

export const getFavoritesRecipes = (): Recipe[] | null => {
  const favoriteRecipes: Recipe[] | null = JSON.parse(localStorage.getItem('favoritesRecipes')!)
  return favoriteRecipes;
}