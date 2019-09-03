import React from 'react';
import PropTypes from 'prop-types';

import styles from './deck.scss';

export default function Deck({ cardsLeft, label, enemy }) {
  return (
    <div className={`${styles.deck} ${label === 'DISCARD' ? styles.discard : ''}`}>
      {label}
      {cardsLeft >= 3 && <div className={`${styles.cardBack} ${enemy ? styles.enemy : ''} ${styles.cardBackLast}`} />}
      {cardsLeft >= 2 && <div className={`${styles.cardBack} ${enemy ? styles.enemy : ''} ${styles.cardBackMiddle}`} />}
      {cardsLeft ? <div className={`${styles.cardBack} ${enemy ? styles.enemy : ''}`} /> : null}
    </div>
  );
}

Deck.propTypes = {
  cardsLeft: PropTypes.number,
  label: PropTypes.string
};
