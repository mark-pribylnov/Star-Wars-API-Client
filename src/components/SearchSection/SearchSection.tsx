import { Component } from 'react';
import styles from './SearchSection.module.scss';

type SearchSectionProps = {
  name: string;
};

export class SearchSection extends Component<SearchSectionProps> {
  render() {
    return <h1 className={styles.root}>{this.props.name}</h1>;
  }
}
