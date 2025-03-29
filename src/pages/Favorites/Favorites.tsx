import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getFavoritesRecipes } from '../../utils/getLocalStorage';
import styles from './Favorites.module.css';

export default function Favorites() {
  const favoritesRecipes = getFavoritesRecipes()

  if (!favoritesRecipes?.length) {
    return (
      <>
        <Header title='Receitas Concluidas' />
        <main className={styles.noFavorites}>
          <h1>Nehuma receita favoritadas</h1>
          <Link to='/' className={styles.redirectBtn}>Começar uma receita</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header title='Receitas Concluidas' />
      <main className={styles.main}>
        {favoritesRecipes.map((recipe) => (
          <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className={styles.favoriteRecipeContainer}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className={styles.recipeImg} />
            <h1>{recipe.strMeal}</h1>
          </Link>
        ))}
      </main>
    </>
  )
}
