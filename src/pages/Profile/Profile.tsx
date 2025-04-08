import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './Profile.module.css';
import { getDoneRecipes, getFavoritesRecipes } from '../../utils/getLocalStorage';
import { getChefLevel } from '../../utils/getChefLevel';
import chef from '../../images/chef.jpg'
import ProgressBar from '../../components/ProgressBar/ProgressBar';

export default function Profile() {
  const doneRecipes = getDoneRecipes();
  const favoriteRecipes = getFavoritesRecipes();
  const { level, label, progress } = getChefLevel(doneRecipes?.length || 0);

  return (
    <>
      <Header title="Perfil do Chef" />
      <main className={styles.main}>
        <section className={styles.profileInfo}>
          <img
            src={chef}
            alt="Avatar do usuário"
            className={styles.avatar}
          />
          <div>
            <h2 className={styles.profileTitle}>Olá, Chef!</h2>
            <p className={styles.profileText}>Nível: {level} - {label} </p>
          </div>
        </section>
        <ProgressBar
          title={`${doneRecipes?.length || 0} de 25 receitas`}
          progress={progress}
        />
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statCardIcon}>🍽️</span>
            <p>Concluídas</p>
            <strong className={styles.statCardCounter}>{doneRecipes?.length || 0}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statCardIcon}>❤️</span>
            <p>Favoritas</p>
            <strong className={styles.statCardCounter}>{favoriteRecipes?.length || 0}</strong>
          </div>
        </section>

        <nav className={styles.linksContainer}>
          <Link to="/done-recipes" className={styles.link}>Ver receitas concluídas</Link>
          <Link to="/favorites" className={styles.link}>Ver receitas favoritas</Link>
        </nav>
      </main>
    </>
  )
}
