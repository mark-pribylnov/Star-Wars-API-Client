import { Component } from 'react';
import styles from './ErrorBoundary.module.scss';
import App from '../../App';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  Record<string, never>,
  ErrorBoundaryState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  private restoreApp = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.root}>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.description}>
            The app hit an unexpected error. You can try restoring it without
            reloading the page.
          </p>
          <button className={styles['back-button']} onClick={this.restoreApp}>
            Restore app
          </button>
        </div>
      );
    }

    return <App />;
  }
}
