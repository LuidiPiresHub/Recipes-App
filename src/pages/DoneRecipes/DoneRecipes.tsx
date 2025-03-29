import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getDoneRecipes } from '../../utils/getLocalStorage';
import styles from './DoneRecipes.module.css';

export default function DoneRecipes() {
  const doneRecipes = getDoneRecipes();

  if (!doneRecipes?.length) {
    return (
      <>
        <Header title='Receitas Concluidas' />
        <main className={styles.noRecipes}>
          <h1>Nehuma receita finalizada</h1>
          <Link to='/' className={styles.redirectBtn}>Começar uma receita</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header title='Receitas Concluidas' />
      <main className={styles.main}>
        {doneRecipes.map((recipe) => (
          <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className={styles.doneRecipeContainer}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className={styles.recipeImg} />
            <h1>{recipe.strMeal}</h1>
          </Link>
        ))}
      </main>
    </>
  )
}
