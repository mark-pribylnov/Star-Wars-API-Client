import { Component } from 'react';
import styles from './NoResultsVisual.module.scss';

type NoResultsVisualProps = {
  searchTerm: string | null;
};

export default class NoResultsVisual extends Component<NoResultsVisualProps> {
  // componentDidMount() {
  //   if (!this.props.searchTerm) throw new Error('Search term is NULL');
  // }

  render() {
    return (
      <div className={styles['no-results-visual']}>
        <img
          className={styles['no-results-image']}
          src="./images/no-results-yoda.webp"
          alt="no results found"
        />
        <div className={styles['no-results-quote']}>
          <div className={styles['text-wrapper']}>
            <p
              className={styles['quote-text']}
            >{`“Blank, the results are. \nHidden, the answers remain.”`}</p>
            <p className={styles['quote-author']}>{`— YODA`}</p>
          </div>
        </div>
      </div>
    );
  }
}
