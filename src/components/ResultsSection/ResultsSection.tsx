import { Component } from 'react';
import styles from './ResultsSection.module.scss';

type ResultsSectionProps = {
  resultsNumber: number;
};

export default class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { resultsNumber } = this.props;

    return (
      <div className={styles.root}>
        <h2 className={styles['search-heading']}>
          Search results
          <span className={styles['results-number']}>{resultsNumber}</span>
        </h2>
        <table className={styles['table']}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <span className={styles['name-wrapper']}>
                  <img
                    className={styles['item-img']}
                    src="/search-items/vader.png"
                    alt="darth vader"
                  />
                  Darth Vader
                </span>
              </th>
              <td>
                A Dark Lord of the Sith, once Anakin Skywalker, who serves the
                Galactic Empire and is the enforcer of Emperor Palpatine.
              </td>
            </tr>
            <tr>
              <th>
                {' '}
                <span className={styles['name-wrapper']}>
                  <img
                    className={styles['item-img']}
                    src="/search-items/luke.png"
                    alt="darth vader"
                  />
                  Luke Skywalker
                </span>
              </th>
              <td>
                A legendary Jedi Knight and hero of the Rebel Alliance who plays
                a crucial role in the fight against the Galactic Empire.
              </td>
            </tr>
            <tr>
              <th>
                {' '}
                <span className={styles['name-wrapper']}>
                  <img
                    className={styles['item-img']}
                    src="/search-items/planet.png"
                    alt="darth vader"
                  />
                  Tatooine
                </span>
              </th>
              <td>
                A desert planet and the home of Anakin Skywalker. It is known
                for its harsh environment and twin suns.
              </td>
            </tr>
            <tr>
              <th>
                {' '}
                <span className={styles['name-wrapper']}>
                  <img
                    className={styles['item-img']}
                    src="/search-items/ship.png"
                    alt="darth vader"
                  />
                  Millennium Falcon
                </span>
              </th>
              <td>
                A YT-1300 light freighter owned by Han Solo and Chewbacca. It is
                known for making the Kessel Run in less than 12 parsecs.
              </td>
            </tr>
            <tr>
              <th>
                {' '}
                <span className={styles['name-wrapper']}>
                  <img
                    className={styles['item-img']}
                    src="/search-items/joda.png"
                    alt="darth vader"
                  />
                  Yoda
                </span>
              </th>
              <td>
                A legendary Jedi Master and one of the most powerful Jedi in the
                galaxy.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
