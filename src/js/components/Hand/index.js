import React from 'react';
import PropTypes from 'prop-types';

import styles from './hand.scss';

export default class Hand extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.hand}>
        Hand
      </div>
    );
  }
}

Hand.propTypes = {
  name: PropTypes.string,
};