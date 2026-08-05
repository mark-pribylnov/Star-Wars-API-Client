// TODO: migrate CSS to Tailwind

import styles from './App.module.scss';
import { SearchSection } from './components/SearchSection/SearchSection';
import { ResultsSection } from './components/ResultsSection/ResultsSection';

function App() {
  return (
    <div className={styles['app-wrapper']}>
      <SearchSection name="Search" />
      <ResultsSection results="Results" />
    </div>
  );
}

export default App;
