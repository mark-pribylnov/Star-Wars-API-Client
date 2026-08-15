// TODO: migrate CSS to Tailwind
// TODO: handle errors in ApiService from the API
// TODO: in types 'additional property: false' is duplicated in each file
// TODO: show HTTP error to the user, not console

import { Component } from 'react';
import styles from './App.module.scss';
import SearchSection from './components/SearchSection/SearchSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { Header } from './components/Header/Header';

export default class App extends Component {
  render() {
    return (
      <div className={styles['app-wrapper']}>
        <Header />
        <SearchSection />
        <ResultsSection resultsNumber={5} />
      </div>
    );
  }
}
