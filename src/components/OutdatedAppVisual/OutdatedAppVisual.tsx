import { Component } from 'react';
import styles from './OutdatedAppVisual.module.scss';
import InfoIcon from '../../assets/icons/info/InfoIcon';

export default class OutdatedAppVisual extends Component {
  render() {
    return (
      <>
        <h2 className={styles['title']}>App needs an update</h2>
        <p className={styles['text']}>
          The&nbsp;
          <a
            className={styles['api-link']}
            href="https://swapi.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            API
          </a>
          &nbsp;data format has changed, and this version can&apos;t read it
          anymore.
          <br /> We can&apos;t load the catalog until the app is updated.
        </p>

        <img
          className={styles['image']}
          src="./images/outdated-app-visual.webp"
          alt="app needs an update"
        />

        <p className={styles['contact-note']}>
          <InfoIcon size={18} />
          Please contact the developer to update the app.
        </p>
      </>
    );
  }
}
