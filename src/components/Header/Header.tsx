import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderProps } from '../../interfaces/Header.interface';
import styles from './Header.module.css';
import { FaHeart, FaRegHeart, FaShareAlt, FaRegUserCircle } from 'react-icons/fa';
import { getFavoritesRecipes } from '../../utils/getLocalStorage';
import { toast } from 'react-toastify';

export default function Header({ title, showIcons, isFavorite, recipe, setIsFavorite, showProile = true }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation()

  const handleNavigate = (): void => {
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  const saveFavoriteRecipe = (): void => {
    if (recipe && setIsFavorite) {
      setIsFavorite(true)
      const favoritesRecipes = getFavoritesRecipes()
      const existFavorite = favoritesRecipes?.some((favoriteRecipe) => favoriteRecipe.idMeal === recipe.idMeal)
      if (!existFavorite) {
        localStorage.setItem('favoritesRecipes', JSON.stringify(favoritesRecipes ? [...favoritesRecipes, recipe] : [recipe]))
      }
    }
  }

  const unsaveFavoriteRecipe = (): void => {
    if (recipe && setIsFavorite) {
      setIsFavorite(false)
      const favoritesRecipes = getFavoritesRecipes()
      const filterFavorites = favoritesRecipes?.filter((favoriteRecipe) => favoriteRecipe.idMeal !== recipe.idMeal);
      localStorage.setItem('favoritesRecipes', JSON.stringify(filterFavorites))
    }
  }

  const copyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(window.location.href)
    toast("Link copiado ✔", {
      pauseOnHover: false,
      theme: 'dark',
      autoClose: 2000,
      position: 'top-left'
    });
  }

  return (
    <header className={styles.header}>
      <h1 onClick={handleNavigate} className={styles.title}>{title}</h1>
      <section className={styles.iconsContainer}>
        {showIcons && (
          <>
            {isFavorite ? <FaHeart className={`${styles.icon} ${styles.heart}`} onClick={unsaveFavoriteRecipe} /> : <FaRegHeart className={styles.icon} onClick={saveFavoriteRecipe} />}
            <FaShareAlt className={`${styles.icon} ${styles.share}`} onClick={copyLink} />
          </>
        )}
        {showProile && <FaRegUserCircle className={`${styles.icon}`} onClick={() => navigate('/profile')} />}
      </section>
    </header>
  )
}
