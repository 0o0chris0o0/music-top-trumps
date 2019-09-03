import React from 'react';
import { Link } from 'react-router-dom';

import styles from './start.scss';

export default function Start() {
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell text-center">
          <h1 className={styles.title}>Musical Battles!!!</h1>
          <Link to="/build-deck">
            <button className="button">Begin</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
