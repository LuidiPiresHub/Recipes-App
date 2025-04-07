import styles from './Loading.module.css'

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.spinner} />
    </main>
  )
}
