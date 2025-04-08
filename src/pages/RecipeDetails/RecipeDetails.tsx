import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Recipe } from '../../interfaces/Recipe.interface'
import styles from './RecipeDetails.module.css'
import Header from '../../components/Header/Header'
import { getDoneRecipes, getFavoritesRecipes } from '../../utils/getLocalStorage'
import { getIngredients } from '../../utils/getIngredients'
import Loading from '../../components/Loading/Loading'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { fireConfettiShow } from '../../utils/confetti'
import { toast } from 'react-toastify'

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ingredientsChecked, setIngredientsChecked] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeAndInit = async () => {
      if (!recipe) {
        const { data } = await axios.get<{ meals: Recipe[] }>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const currentRecipe = data.meals[0];
        setRecipe(currentRecipe);
        setIsLoading(false);

        const favoriteRecipes = getFavoritesRecipes();
        const isFavorite = favoriteRecipes?.some((fav) => fav.idMeal === currentRecipe.idMeal);
        setIsFavorite(Boolean(isFavorite));

        const savedState = localStorage.getItem(`checked_ingredients_${currentRecipe.idMeal}`);
        if (savedState) setIngredientsChecked(JSON.parse(savedState));
      }
    };

    fetchRecipeAndInit();
  }, [recipe, id]);

  useEffect(() => {
    if (recipe) {
      if (ingredientsChecked.length) {
        localStorage.setItem(`checked_ingredients_${recipe.idMeal}`, JSON.stringify(ingredientsChecked));
      } else {
        localStorage.removeItem(`checked_ingredients_${recipe.idMeal}`);
      }
    }
  }, [recipe, ingredientsChecked]);

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
    if (isFinishing) return;
    setIsFinishing(true);

    const allDoneRecipes = getDoneRecipes()
    const existRecipe = allDoneRecipes?.some((doneRecipe) => doneRecipe.idMeal === recipe.idMeal);
    if (!existRecipe) {
      localStorage.setItem('doneRecipes', JSON.stringify(allDoneRecipes ? [...allDoneRecipes, recipe] : [recipe]))
    }

    fireConfettiShow();

    toast('Receita finalizada! Uhuuuu 😎', {
      pauseOnHover: false,
      theme: 'light',
      autoClose: 2000,
      position: 'bottom-right',
      type: 'success'
    })

    setTimeout(() => {
      unmarkAll()
      navigate('/done-recipes')
    }, 2500)

  };

  const btnDisable = ingredientsChecked.length !== ingredients.length;

  if (isLoading) {
    return (
      <>
        <Header title='Carregando...' />
        <Loading />
      </>
    )
  }

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
            <h1 className={styles.recipeTitle}>{recipe.strMeal}</h1>
            <p className={styles.recipeInstructions}>{recipe.strInstructions}</p>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <label htmlFor={`ingredient ${index}`} className={styles.ingredientLabel}>
                    <input
                      type='checkbox'
                      id={`ingredient ${index}`}
                      className={styles.ingredientInput}
                      checked={ingredientsChecked.includes(ingredient)}
                      onChange={() => handleCheckboxChange(ingredient)}
                    />
                    <span className={styles.ingredient}>{ingredient}</span>
                  </label>
                </li>
              ))}
            </ul>
            <ProgressBar
              title={`${ingredientsChecked.length} de ${ingredients.length} ingredientes`}
              progress={Math.round(ingredientsChecked.length / ingredients.length * 100)}
            />
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

            {btnDisable && (
              <p className={styles.finishNotice}>
                ⚠️ Marque todos os ingredientes para finalizar! ⚠️
              </p>
            )}

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
      </main >
    </>
  );
}
