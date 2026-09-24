import styles from './NoResultsVisual.module.scss';

export default function NoResultsVisual() {
  return (
    <div className={styles['wrapper']}>
      <img
        className={styles['image']}
        src="./images/no-results-yoda.webp"
        alt="no results found"
      />
      <div className={styles['quote-wrapper']}>
        <div className={styles['text-wrapper']}>
          <p
            className={styles['text']}
          >{`“Blank, the results are. \nHidden, the answers remain.”`}</p>
          <p className={styles['author']}>{`— YODA`}</p>
        </div>
      </div>
    </div>
  );
}
