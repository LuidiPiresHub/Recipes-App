import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './Recipes.module.css'
import { Link } from 'react-router-dom'
import { Recipe } from '../../interfaces/Recipe.interface'
import Header from '../../components/Header/Header'

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const getRecipes = async (): Promise<void> => {
      const { data } = await axios.get<{ meals: Recipe[] }>('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      setRecipes(data.meals)
    }
    getRecipes()
  }, [])


  return (
    <>
    <Header title='Recipes App' />
      <main className={styles.main}>
        <section className={styles.recipesContainer}>
          {recipes.map((recipe) => (
            <Link key={recipe.idMeal} className={styles.recipe} to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className={styles.foodImg} />
              <h2>{recipe.strMeal}</h2>
            </Link>
          ))}
        </section>
      </main>
    </>
  )
}
