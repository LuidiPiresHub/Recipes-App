import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './Profile.module.css';
import { getDoneRecipes, getFavoritesRecipes } from '../../utils/getLocalStorage';
import { getChefLevel } from '../../utils/getChefLevel';

export default function Profile() {
  const doneRecipes = getDoneRecipes();
  const favoriteRecipes = getFavoritesRecipes();
  return (
    <>
      <Header title='Tela de Perfil' />
      <main className={styles.main}>
        <h1>Total de receitas concluidas: {doneRecipes?.length || 0}</h1>
        <h1>Total de receitas favoritas: {favoriteRecipes?.length || 0}</h1>
        <h1>Rank: {getChefLevel(doneRecipes?.length || 0)}</h1>
        <nav className={styles.linksContainer}>
          <Link to='/done-recipes' className={styles.link} >Ver receitas concluidas</Link>
          <Link to='/favorites' className={styles.link} >Ver receitas favoritas</Link>
        </nav>
      </main>
    </>
  )
}
