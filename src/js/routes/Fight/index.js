import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pullAt as _pullAt, findIndex as _findIndex, cloneDeep } from 'lodash';
import { TweenLite } from 'gsap';

import {
  playerAddToHand,
  playerAddToDiscard,
  playerRemoveFromDeck,
  playerRemoveFromHand
} from '../../store/actions/playerActions';

import {
  enemyAddToHand,
  enemyRemoveFromDeck,
  enemyRemoveFromHand,
  enemyAddToDiscard
} from '../../store/actions/enemyActions';

import styles from './fight.scss';

import EnemyZone from './components/enemyZone';
import PlayerZone from './components/playerZone';
import Score from './components/score';
import FightCards from './components/FightCards';

class Fight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      enemyScore: 0,
      playerScore: 0,
      round: 1,
      centerText: 'Round',
      playerSelect: false,
      selectedTrack: null,
      fightMode: false,
      enemyCard: null,
      result: null,
      selectedSkill: null,
      winner: null
    };

    this.handSize = 7;
    this.scoreLimit = 4;

    this.startGame = this.startGame.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.selectFightSkill = this.selectFightSkill.bind(this);
  }

  componentDidUpdate() {
    this.startGame();
  }

  startGame() {
    if (this.state.status === 'loading') {
      this.drawCard(7, 'player');
      this.drawCard(7, 'enemy');
      this.beginRound();
      this.setState({
        status: 'complete'
      });
    }
  }

  beginRound() {
    const { playerScore, enemyScore } = this.state;

    if (playerScore >= this.scoreLimit || enemyScore >= this.scoreLimit) {
      this.announceWinner();
    } else {
      // Set round text
      this.setState(
        {
          centerText: `Round ${this.state.round}`
        },
        this.showRoundInstruction
      );
    }
  }

  showRoundInstruction() {
    TweenLite.to('#roundCounter', 0.3, {
      opacity: 1,
      onComplete: () => {
        this.updateCenterText('Select a Card...', 2).then(() => {
          this.toggleCardSelect(true);
        });
      }
    });
  }

  updateCenterText(text, duration) {
    return new Promise(resolve => {
      TweenLite.to('#roundCounter', duration / 3, {
        opacity: 0,
        transform: 'scale(5)',
        onComplete: () => this.setState({ centerText: text })
      });
      TweenLite.to('#roundCounter', duration / 3, {
        opacity: 1,
        transform: 'scale(1)',
        onComplete: resolve
      }).delay(duration / 3);
    });
  }

  beginFight() {
    const { selectedTrack } = this.state;
    this.discardCard('player', selectedTrack.id);
    this.drawCard(1, 'player');
    this.updateCenterText('', 1);
    this.drawEnemyCard().then(() => {
      this.setState({
        fightMode: true
      });
    });
  }

  ///////////////

  toggleCardSelect(toggle) {
    this.setState({ playerSelect: toggle });
  }

  ////////////////

  drawEnemyCard() {
    const { enemy } = this.props;
    const randId = Math.floor(Math.random() * enemy.hand.length);
    const enemyCard = enemy.hand[randId];
    this.discardCard('enemy', enemyCard.id);
    this.drawCard(1, 'enemy');

    return new Promise(resolve => {
      this.setState({ enemyCard }, resolve);
    });
  }

  checkResult(chosenSkill) {
    const { enemyCard } = this.state;
    let enemySkill = 0;

    if (chosenSkill.skill === 'popularity') {
      enemySkill = enemyCard.popularity;
    } else {
      enemySkill = enemyCard[chosenSkill.skill] * 100;
    }

    if (chosenSkill.value === enemySkill.popularity) {
      return 'draw';
    } else if (chosenSkill.value > enemySkill) {
      return 'player';
    }
    return 'enemy';
  }

  finishRound() {
    const { round } = this.state;

    setTimeout(() => {
      this.setState(
        {
          fightMode: false,
          result: null,
          selectedSkill: null,
          selectedTrack: null,
          round: round + 1,
          enemyCard: null
        },
        this.beginRound
      );
    }, 2000);
  }

  announceWinner() {
    const { playerScore, enemyScore } = this.state;
    const winner = playerScore > enemyScore ? 'player' : 'enemy';
    this.setState({
      winner
    });
  }

  //////////////////

  selectCard(track) {
    this.toggleCardSelect(false);
    this.setState(
      {
        selectedTrack: track
      },
      this.beginFight
    );
  }

  selectFightSkill(chosenSkill) {
    const { enemyScore, playerScore } = this.state;

    const result = this.checkResult(chosenSkill);
    const newScores = { enemyScore, playerScore };

    if (result === 'player') {
      newScores.playerScore = playerScore + 1;
    } else if (result === 'enemy') {
      newScores.enemyScore = enemyScore + 1;
    } else if (result === 'draw') {
      this.scoreLimit -= 1;
    }

    this.setState(
      {
        ...newScores,
        result,
        selectedSkill: chosenSkill.skill
      },
      this.finishRound
    );
  }

  drawCard(length, user) {
    const { hand, deck } = this.props[user];
    let tempIndex = 1;
    const tempArray = [];
    const tempIds = [];
    // clone the player deck to avoid mutating original array
    const tempDeck = cloneDeep(deck);

    if (deck.length && hand.length < this.handSize) {
      while (tempIndex <= length) {
        // generate random index from remaining tracks
        const randId = Math.floor(Math.random() * tempDeck.length);
        // pull random track
        const track = _pullAt(tempDeck, randId);

        // add track to array
        tempArray.push(track[0]);
        tempIds.push(track[0].id);
        tempIndex += 1;
      }

      if (user === 'player') {
        this.props.playerAddToHand(tempArray);
        this.props.playerRemoveFromDeck(tempIds);
      } else {
        this.props.enemyAddToHand(tempArray);
        this.props.enemyRemoveFromDeck(tempIds);
      }
    }
  }

  discardCard(user, trackId) {
    const { hand } = this.props[user];
    // clone the original player hand to avoid mutuatig original array
    const tempHand = cloneDeep(hand);

    if (hand.length) {
      const cardIndex = _findIndex(tempHand, card => card.id === trackId);
      const removedCard = _pullAt(tempHand, cardIndex);

      if (user === 'player') {
        this.props.playerRemoveFromHand(trackId);
        this.props.playerAddToDiscard(removedCard);
      } else {
        this.props.enemyRemoveFromHand(trackId);
        this.props.enemyAddToDiscard(removedCard);
      }
    }
  }

  render() {
    const {
      playerScore,
      enemyScore,
      centerText,
      playerSelect,
      fightMode,
      selectedTrack,
      enemyCard,
      result,
      selectedSkill,
      winner
    } = this.state;

    return (
      <div className="grid-container">
        {fightMode && (
          <FightCards
            playerCard={selectedTrack}
            chooseSkill={this.selectFightSkill}
            enemyCard={enemyCard}
            result={result}
            selectedSkill={selectedSkill}
          />
        )}
        {winner && (
          <div className={styles.winner}>
            <div className="text-center">
              <span>You {winner === 'player' ? 'win' : 'lose'}!!</span>
              <Link to="/build-deck">
                <button className="button">Play Again</button>
              </Link>
            </div>
          </div>
        )}
        <div
          className={`grid-y grid-frame align-center ${styles.fightContainer} ${
            fightMode ? styles.fightMode : ''
          }`}>
          <EnemyZone />
          <div className={'cell small-3'}>
            <Score playerScore={playerScore} enemyScore={enemyScore} centerText={centerText} />
          </div>
          <PlayerZone canSelect={playerSelect} selectCard={this.selectCard} />
        </div>
      </div>
    );
  }
}

Fight.propTypes = {
  name: PropTypes.string
};

// ===================================
// ======= BEGIN REDUX CONNECT =======
// ===================================

function mapStateToProps(state) {
  const { player, enemy } = state;
  return { player, enemy };
}

function mapDispatchToProps(dispatch) {
  return {
    playerAddToHand: track => {
      dispatch(playerAddToHand(track));
    },
    enemyAddToHand: track => {
      dispatch(enemyAddToHand(track));
    },
    playerRemoveFromHand: trackId => {
      dispatch(playerRemoveFromHand(trackId));
    },
    enemyRemoveFromHand: trackId => {
      dispatch(enemyRemoveFromHand(trackId));
    },
    playerRemoveFromDeck: trackId => {
      dispatch(playerRemoveFromDeck(trackId));
    },
    enemyRemoveFromDeck: trackId => {
      dispatch(enemyRemoveFromDeck(trackId));
    },
    playerAddToDiscard: track => {
      dispatch(playerAddToDiscard(track));
    },
    enemyAddToDiscard: track => {
      dispatch(enemyAddToDiscard(track));
    }
  };
}

const FightLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fight);

export default FightLink;
