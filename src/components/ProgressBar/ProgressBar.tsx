import { ProgressBarProps } from '../../interfaces/ProgressBarProps.interface';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ title, progress }: ProgressBarProps) {
  return (
    <section className={styles.progressInfo}>
      <div className={styles.progressText}>
        <p className={styles.title}>{title}</p>
        <p className={styles.progress}>{progress}% completo</p>
      </div>
      <section className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </section>
    </section>
  )
}
