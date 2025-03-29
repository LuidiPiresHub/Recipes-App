import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Recipe } from '../../interfaces/Recipe.interface'
import styles from './RecipeDetails.module.css'
import Header from '../../components/Header/Header'
import { getDoneRecipes, getFavoritesRecipes } from '../../utils/getLocalStorage'

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [ingredientsChecked, setIngredientsChecked] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = () => {
      if (recipe) {
        const favoriteRecipes = getFavoritesRecipes()
        const isFavorite = favoriteRecipes?.some((favoriteRecipe) => favoriteRecipe.idMeal === recipe.idMeal)
        setIsFavorite(Boolean(isFavorite))
      }
    }
    getRecipe()
  }, [recipe])

  useEffect(() => {
    const getRecipeById = async () => {
      if (!recipe) {
        const { data } = await axios.get<{ meals: Recipe[] }>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        setRecipe(data.meals[0])
      }
    }
    getRecipeById()
  }, [id, recipe])

  const getIngredients = (recipe: Recipe): string[] => {
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

  useEffect(() => {
    if (recipe) {
      const savedState = localStorage.getItem(`checked_ingredients_${recipe.idMeal}`);
      if (savedState) {
        setIngredientsChecked(JSON.parse(savedState));
      }
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe) {
      localStorage.setItem(`checked_ingredients_${recipe.idMeal}`, JSON.stringify(ingredientsChecked));
    }
  }, [ingredientsChecked, recipe]);

  if (!recipe) return;

  const ingredients = getIngredients(recipe);

  const handleCheckboxChange = (item: string) => {
    setIngredientsChecked((prevState) =>
      prevState.includes(item)
        ? prevState.filter((ingredient) => ingredient !== item)
        : [...prevState, item]
    );
  };

  const markAll = () => setIngredientsChecked(ingredients);

  const unmarkAll = () => setIngredientsChecked([]);

  const finishRecipe = () => {
    const allDoneRecipes = getDoneRecipes()
    const existRecipe = allDoneRecipes?.some((doneRecipe) => doneRecipe.idMeal === recipe.idMeal);
    if (!existRecipe) {
      localStorage.setItem('doneRecipes', JSON.stringify(allDoneRecipes ? [...allDoneRecipes, recipe] : [recipe]))
    }
    unmarkAll()
    navigate('/done-recipes');
  };

  const btnDisable = ingredientsChecked.length !== ingredients.length;

  return (
    <>
      <Header
        title={recipe.strMeal}
        showIcons={true}
        isFavorite={isFavorite}
        recipe={recipe}
        setIsFavorite={setIsFavorite}
      />
      <main className={styles.main}>
        {recipe && (
          <section className={styles.recipeContainer}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className={styles.recipeImg} />
            <h1>{recipe.strMeal}</h1>
            <p className={styles.recipeInstructions}>{recipe.strInstructions}</p>

            {ingredients.map((ingredient, index) => (
              <label key={index} htmlFor={`ingredient ${index}`} className={styles.ingredientLabel}>
                <input
                  type='checkbox'
                  id={`ingredient ${index}`}
                  className={styles.ingredientInput}
                  checked={ingredientsChecked.includes(ingredient)}
                  onChange={() => handleCheckboxChange(ingredient)}
                />
                <span className={styles.ingredient}>{ingredient}</span>
              </label>
            ))}

            <section className={styles.buttonContainer}>
              <button type='button' className={styles.markerBtn} onClick={unmarkAll}>
                Desmarcar Tudo
              </button>
              <button type='button' className={styles.markerBtn} onClick={markAll}>
                Marcar Tudo
              </button>
            </section>

            <iframe
              src={recipe.strYoutube.replace('watch?v=', 'embed/')}
              allowFullScreen={true}
              className={styles.recipeVideo}
            />

            <button
              type='button'
              className={styles.finishBtn}
              onClick={finishRecipe}
              disabled={btnDisable}
            >
              Finalizar Receita
            </button>
          </section>
        )}
      </main>
    </>
  );
}
