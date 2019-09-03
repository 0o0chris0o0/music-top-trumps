import React from 'react';
import PropTypes from 'prop-types';

import styles from './fightCards.scss';

import Card from '../../../components/StaticCard';

export default class FightCards extends React.Component {
  constructor(props) {
    super(props);

    this.chooseSkill = this.chooseSkill.bind(this);
  }

  chooseSkill(chosenSkill) {
    this.props.chooseSkill(chosenSkill);
  }

  render() {
    const { playerCard, enemyCard, result, selectedSkill } = this.props;

    debugger;

    let centerText = '';
    switch (result) {
      case 'player':
        centerText = 'You Win!!';
        break;
      case 'enemy':
        centerText = 'You Lose!!';
        break;
      default:
        centerText = 'VS';
        break;
    }

    return (
      <div className={styles.fightCards}>
        <div className={`grid-container ${styles.container}`}>
          <div className={`grid-x align-middle align-center ${styles.container}`}>
            <div className="cell small-5 text-center">
              <div className={styles.cardContainer}>
                <Card
                  track={playerCard}
                  chooseSkill={this.chooseSkill}
                  selectedSkill={selectedSkill}
                  result={result}
                  isFightMode
                  isPlayer
                />
              </div>
            </div>
            <div className="cell small-2">
              <div className={`text-center ${styles.middle}`}>
                <p>{centerText}</p>
                {!result && <span className="text-center pulse">Select a Battle Category</span>}
              </div>
            </div>
            <div className="cell small-5 text-center">
              <div className={`${styles.cardContainer}`}>
                <Card
                  track={enemyCard}
                  selectedSkill={selectedSkill}
                  result={result}
                  isFightMode
                  hideDetails
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FightCards.propTypes = {
  name: PropTypes.string
};
