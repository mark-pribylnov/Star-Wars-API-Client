import { Component } from 'react';
import styles from './SearchSection.module.scss';

type SearchSectionProps = {
  name: string;
};

export class SearchSection extends Component<SearchSectionProps> {
  render() {
    return <div className={styles.root}>{this.props.name}</div>;
  }
}
