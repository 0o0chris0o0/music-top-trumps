import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { playerAddToDeck } from '../../../store/actions/playerActions';

import styles from './playerZone.scss';

import Card from '../../../components/StaticCard';
import Deck from './deck';

class playerZone extends React.Component {
  constructor(props) {
    super(props);

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard(track) {
    this.props.selectCard(track);
  }

  render() {
    const { canSelect } = this.props;
    const { hand, deck, discard } = this.props.player;

    const playerHandElems = hand.map((track, i) => {
      const startAngle = hand.length * hand.length / 2;
      const rotation = -startAngle + hand.length * (i + 1) - startAngle / hand.length;
      const style = {
        transform: `rotate(${rotation}deg) translateY(${rotation}px)`
      };
      return (
        <div key={track.id} className="hand__card">
          <div style={style} className="hand__card-face">
            <Card track={track} onSelect={this.selectCard} showDetails />
          </div>
        </div>
      );
    });

    return (
      <div className={`${styles.playerZone} ${canSelect ? styles.active : styles.disabled}`}>
        <div className={`grid-x ${styles.playerZoneInner}`}>
          <div className="cell shrink">
            <Deck cardsLeft={deck.length} label="DECK" />
          </div>
          <div className="cell auto">
            <div id="playerZone" className={styles.playerHand}>
              {playerHandElems}
            </div>
          </div>
          <div className="cell shrink">
            <Deck cardsLeft={discard.length} label="DISCARD" />
          </div>
        </div>
      </div>
    );
  }
}

playerZone.propTypes = {
  name: PropTypes.string
};

// ===================================
// ======= BEGIN REDUX CONNECT =======
// ===================================

function mapStateToProps(state) {
  const { player } = state;
  return { player };
}

function mapDispatchToProps(dispatch) {
  return {
    playerAddToDeck: trackId => {
      dispatch(playerAddToDeck(trackId));
    }
  };
}

const playerZoneLink = connect(mapStateToProps, mapDispatchToProps)(playerZone);

export default playerZoneLink;
