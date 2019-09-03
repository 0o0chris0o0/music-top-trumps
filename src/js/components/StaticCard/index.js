import React from 'react';
import PropTypes from 'prop-types';

import styles from './staticCard.scss';

import SkillRow from './skillRow';

export default class StaticCard extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.chooseSkill = this.chooseSkill.bind(this);
  }

  onSelect() {
    const { track } = this.props;
    this.props.onSelect(track);
  }

  chooseSkill(chosenSkill) {
    this.props.chooseSkill(chosenSkill);
  }

  getSkills() {
    const { track, onSelect, selectedSkill, result, hideDetails, isPlayer } = this.props;

    const highlightStyle = {};

    switch (result) {
      case 'player':
        highlightStyle.background = isPlayer ? 'green' : 'red';
        break;
      case 'enemy':
        highlightStyle.background = isPlayer ? 'red' : 'green';
        break;
      default:
        highlightStyle.background = 'yellow';
        break;
    }

    return (
      <div className={`${styles.trackSkills} ${hideDetails && !result ? styles.bluredScores : ''}`}>
        <SkillRow
          className={styles.skillRow}
          style={selectedSkill === 'energy' ? highlightStyle : null}
          label="Energy"
          value={Math.round(track.energy * 100)}
          isButton={typeof onSelect === 'undefined'}
          chooseSkill={this.chooseSkill}
          disabled={result}
        />
        <SkillRow
          className={styles.skillRow}
          style={selectedSkill === 'valence' ? highlightStyle : null}
          label="Valence"
          value={Math.round(track.valence * 100)}
          isButton={typeof onSelect === 'undefined'}
          chooseSkill={this.chooseSkill}
          disabled={result}
        />
        <SkillRow
          className={styles.skillRow}
          style={selectedSkill === 'danceability' ? highlightStyle : null}
          label="Danceability"
          value={Math.round(track.danceability * 100)}
          isButton={typeof onSelect === 'undefined'}
          chooseSkill={this.chooseSkill}
          disabled={result}
        />
        <SkillRow
          className={styles.skillRow}
          style={selectedSkill === 'popularity' ? highlightStyle : null}
          label="Popularity"
          value={track.popularity}
          isButton={typeof onSelect === 'undefined'}
          chooseSkill={this.chooseSkill}
          disabled={result}
        />
        <SkillRow
          className={styles.skillRow}
          style={selectedSkill === 'speechiness' ? highlightStyle : null}
          label="Speechiness"
          value={Math.round(track.speechiness * 100)}
          isButton={typeof onSelect === 'undefined'}
          chooseSkill={this.chooseSkill}
          disabled={result}
        />
      </div>
    );
  }

  render() {
    const { track, add, remove, isFightMode, isPlayer, noAttributes } = this.props;

    const style = {
      backgroundImage: `url(${track.album.images[0].url})`
    };

    const backStyle = isPlayer ? styles.playerCard : styles.enemyCard;

    return (
      <div className={`${styles.card} ${isFightMode && backStyle}`}>
        {this.props.onSelect && <button onClick={this.onSelect} />}
        <div className={styles.inner}>
          <div className={styles.cardName}>
            <span className={styles.artist}>{track.artists[0].name}</span>
            <span className={styles.title}>{track.name}</span>
          </div>
          <div style={style} className={styles.image}>
            {add && (
              <div className={`${styles.edit} ${styles.add}`}>
                <span className={styles.editSymbol}>+</span>
              </div>
            )}
            {remove && (
              <div className={`${styles.edit} ${styles.remove}`}>
                <span className={styles.editSymbol}>-</span>
              </div>
            )}
          </div>
          {!noAttributes && this.getSkills()}
        </div>
      </div>
    );
  }
}

StaticCard.defaultProps = {
  selectedSkill: null,
  result: null
};

StaticCard.propTypes = {
  colsSize: PropTypes.string,
  showDetails: PropTypes.bool,
  add: PropTypes.bool,
  remove: PropTypes.bool,
  isFightMode: PropTypes.bool,
  isPlayer: PropTypes.bool
};
