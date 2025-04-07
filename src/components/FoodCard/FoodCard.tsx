import { Link } from 'react-router-dom'
import { FoodCardProps } from '../../interfaces/FoodCardProps.interface'
import styles from './FoodCard.module.css'

export default function FoodCard({ recipe }: FoodCardProps) {
  return (
    <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className={styles.recipe}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className={styles.foodImg} />
      <h2>{recipe.strMeal}</h2>
    </Link>
  )
}
