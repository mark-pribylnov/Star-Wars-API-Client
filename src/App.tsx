// TODO: migrate CSS to Tailwind

import styles from './App.module.scss';
import SearchSection from './components/SearchSection/SearchSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className={styles['app-wrapper']}>
      <Header />
      <SearchSection />
      <ResultsSection results="Results" />
    </div>
  );
}

export default App;
