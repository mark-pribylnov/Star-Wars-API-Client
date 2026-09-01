import { Component } from 'react';
import styles from './Header.module.scss';

export class Header extends Component {
  render() {
    return (
      <header className={styles.root}>
        <h1 className={styles.title}>Star Wars Search</h1>
        <p className={styles['title__description']}>
          Search characters, planets, starships and more from a galaxy far, far
          away...
        </p>
      </header>
    );
  }
}
