import React from 'react';

import SocialShare from '../SocialShare';

import { images } from '../../utils/importAllImages';
import styles from './_Footer.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`grid-container ${styles.stretch}`}>
        <div className="grid-x grid-x-margin align-justify">
          <SocialShare
            className="headerShare"
            link="#"
            twitterText="Twitter share"
          />
          <div className={styles.spotifyLogo}>
            <img src={images['./spotify.svg']} />
          </div>
        </div>
      </div>
    </footer>
  );
}
