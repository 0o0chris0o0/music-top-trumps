import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { enemyAddToDeck, getEnemyTracks } from '../../../store/actions/enemyActions';

import styles from './enemyZone.scss';

import Deck from './deck';

class EnemyZone extends React.Component {
  constructor(props) {
    super(props);

    this.buildEnemyDeck = this.buildEnemyDeck.bind(this);
  }

  componentDidMount() {
    this.buildEnemyDeck();
  }

  buildEnemyDeck() {
    const { dispatch } = this.props;

    dispatch(getEnemyTracks()).then(response => {
      dispatch(enemyAddToDeck(response, 'enemy'));
    });
  }

  render() {
    const { deck, hand, discard } = this.props.enemy;

    const enemyHand = hand.map((card, i) => {
      const startAngle = hand.length * hand.length / 2;
      const rotation = -startAngle + hand.length * (i + 1) - startAngle / hand.length;
      const style = {
        transform: `rotate(${rotation}deg) translateY(${rotation}px)`
      };
      return <div style={style} key={card.id} className={styles.enemyCardBack} />;
    });

    return (
      <div className={styles.enemyZone}>
        <div className={`grid-x ${styles.enemyZoneInner}`}>
          <div className="cell shrink">
            <Deck cardsLeft={discard.length} label="DISCARD" enemy />
          </div>
          <div className="cell auto">
            <div className={`${styles.enemyHand}`}>{enemyHand}</div>
          </div>
          <div className="cell shrink">
            <Deck cardsLeft={deck.length} label="DECK" enemy />
          </div>
        </div>
      </div>
    );
  }
}

EnemyZone.propTypes = {
  name: PropTypes.string
};

// ===================================
// ======= BEGIN REDUX CONNECT =======
// ===================================

function mapStateToProps(state) {
  const { enemy, player } = state;
  return { enemy, player };
}

const EnemyZoneLink = connect(mapStateToProps)(EnemyZone);

export default EnemyZoneLink;
