import React from 'react'
import styles from './Pagination.module.scss'

const Pagination = () => {
  return (
    <div className={styles.wrapper}>
      <button className={`${styles.page} ${styles.selected}`}>1</button>
      <button className={styles.page}>2</button>
      <button className={styles.next}>
      </button>
    </div>
  )
}

export default Pagination