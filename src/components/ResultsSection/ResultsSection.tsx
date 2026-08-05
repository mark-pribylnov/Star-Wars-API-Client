import { Component } from 'react';
import styles from './ResultsSection.module.scss';

type ResultsSectionProps = {
  results: string;
};

export class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    return <h1 className={styles.root}>{this.props.results}</h1>;
  }
}
