import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderProps } from '../../interfaces/Header.interface';
import styles from './Header.module.css';
import { FaHeart, FaRegHeart, FaShareAlt, FaRegUserCircle } from 'react-icons/fa';
import { getFavoritesRecipes, getTheme } from '../../utils/getLocalStorage';
import { toast } from 'react-toastify';
import ThemeChanger from '../ThemeChanger/ThemeChanger';

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
    const savedTheme = getTheme();
    toast("Link copiado ✔", {
      pauseOnHover: false,
      theme: savedTheme || 'light',
      autoClose: 2000,
      position: 'bottom-right',
      type: 'success'
    });
  }

  return (
    <header className={styles.header}>
      <h1 onClick={handleNavigate} className={styles.title}>{title}</h1>
      <section className={styles.iconsContainer}>
        {showIcons && (
          <>
            {isFavorite ? <FaHeart className={styles.icon} onClick={unsaveFavoriteRecipe} /> : <FaRegHeart className={styles.icon} onClick={saveFavoriteRecipe} />}
            <FaShareAlt className={styles.icon} onClick={copyLink} />
          </>
        )}
        <ThemeChanger />
        {showProile && <FaRegUserCircle className={styles.icon} onClick={() => navigate('/profile')} />}
      </section>
    </header>
  )
}
