import { Recipe } from '../interfaces/Recipe.interface';

export const getIngredients = (recipe: Recipe): string[] => {
  const entries = Object.entries(recipe);

  const ingredientsAndMeasures = entries.reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value && value.trim()) {
      const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
      acc[index] = acc[index] || { ingredient: '', measure: '' };
      acc[index].ingredient = value.trim();
    }

    if (key.includes('strMeasure') && value && value.trim()) {
      const index = parseInt(key.replace('strMeasure', ''), 10) - 1;
      acc[index] = acc[index] || { ingredient: '', measure: '' };
      acc[index].measure = value.trim();
    }

    return acc;
  }, [] as Array<{ ingredient: string; measure: string }>);

  return ingredientsAndMeasures.map(({ measure, ingredient }) => `${measure} - ${ingredient}`);
};