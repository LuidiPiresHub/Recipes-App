import { Recipe } from '../interfaces/Recipe.interface';
import { Theme } from '../interfaces/ThemeChanger.interface';

export const getDoneRecipes = (): Recipe[] | null => {
  const allFinishedRecipes: Recipe[] | null = JSON.parse(localStorage.getItem('doneRecipes')!)
  return allFinishedRecipes;
}

export const getFavoritesRecipes = (): Recipe[] | null => {
  const favoriteRecipes: Recipe[] | null = JSON.parse(localStorage.getItem('favoritesRecipes')!)
  return favoriteRecipes;
}

export const getTheme = (): Theme | null => JSON.parse(localStorage.getItem('theme')!)
