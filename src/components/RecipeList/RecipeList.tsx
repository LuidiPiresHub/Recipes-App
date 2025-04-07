import { RecipeListProps } from '../../interfaces/RecipeListProps.interface';
import FoodCard from '../FoodCard/FoodCard';
import Header from '../Header/Header';
import styles from './RecipeList.module.css';

export function RecipeList({ title, recipes, emptyMessage }: RecipeListProps) {

  if (!recipes || recipes.length === 0) {
    return (
      <>
        <Header title={title} />
        <main className={styles.main}>
          <h1 className={styles.title}>{emptyMessage}</h1>
        </main>
      </>
    )
  }

  return (
    <>
      <Header title={title} />
      <main className={styles.main}>
        <section className={styles.recipesContainer}>
          {recipes.map((recipe) => (
            <FoodCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </section>
      </main>
    </>
  );
}
