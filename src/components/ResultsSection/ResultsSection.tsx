import { Component } from 'react';
import styles from './ResultsSection.module.scss';

type ResultsSectionProps = {
  results: string;
};

export default class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    return <div className={styles.root}>{this.props.results}</div>;
  }
}
