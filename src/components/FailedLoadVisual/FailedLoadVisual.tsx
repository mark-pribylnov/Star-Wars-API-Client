import { Component } from 'react';
import styles from './FailedLoadVisual.module.scss';
import RefreshIcon from '../../assets/icons/refresh/RefreshIcon';
import InfoIcon from '../../assets/icons/info/InfoIcon';
import clsx from 'clsx';

type FailedLoadVisualProps = {
  onRetryLoadData: () => void;
  isLoading: boolean;
};

export default class FailedLoadVisual extends Component<FailedLoadVisualProps> {
  render() {
    const { onRetryLoadData, isLoading } = this.props;

    return (
      <>
        <h2 className={styles['title']}>Failed to load data</h2>
        <p className={styles['text']}>
          The galaxy is vast, and the connection seems to be lost.
          <br /> We couldn&apos;t retrieve the data.
        </p>

        <img
          className={styles['image']}
          src="./images/failed-load-droid.webp"
          alt="failed to load data"
        />
        <div className={styles['actions']}>
          <button
            type="button"
            className={styles['retry-button']}
            onClick={onRetryLoadData}
            disabled={isLoading}
          >
            <RefreshIcon
              size={18}
              className={clsx(
                styles['retry-icon'],
                isLoading && styles['retry-icon--spinning']
              )}
            />
            Try again
          </button>
        </div>

        <p className={styles['persist-note']}>
          <InfoIcon size={18} />
          If the problem persists, please try again later.
        </p>
      </>
    );
  }
}
