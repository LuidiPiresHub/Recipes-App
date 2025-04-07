import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Theme } from '../../interfaces/ThemeChanger.interface';
import styles from './ThemeChanger.module.css';
import { getTheme } from '../../utils/getLocalStorage';

export default function ThemeChanger() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = getTheme();
    const preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const newTheme = savedTheme ? savedTheme : preference;
    document.body.className = newTheme;
    return newTheme;
  });
  const changeTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', JSON.stringify(newTheme));
  }

  return (
    <button className={styles.themeChanger} onClick={changeTheme}>
      {theme === 'light' ? (
        <FaSun className={styles.icon} />
      ) : (
        <FaMoon className={styles.icon} />
      )}
    </button>
  )
}
