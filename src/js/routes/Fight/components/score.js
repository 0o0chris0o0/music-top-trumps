import React from 'react';
import PropTypes from 'prop-types';

import styles from './score.scss';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(props, thing) {}

  render() {
    const { playerScore, enemyScore, centerText } = this.props;
    return (
      <div className={`grid-x text-center align-middle align-spaced ${styles.scores}`}>
        <div className="cell small-2">Your Score: {playerScore}</div>
        <div className="cell small-6">
          <div id="roundCounter" className={styles.roundCounter}>
            {centerText}
          </div>
        </div>
        <div className="cell small-2">Enemy Score: {enemyScore}</div>
      </div>
    );
  }
}

Score.propTypes = {
  name: PropTypes.string
};
