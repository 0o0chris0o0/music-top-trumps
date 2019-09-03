import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pullAt as _pullAt } from 'lodash';
import uuid from 'uuid/v1';

import { playerAddToDeck, playerRemoveFromDeck } from '../../store/actions/playerActions';
import { getTracks, getTrackInfo } from '../../store/actions/topTracksActions';

import styles from './build.scss';

import Loader from '../../components/Loader';
import Card from '../../components/StaticCard';

class Build extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTracks: [],
      selectorCards: []
    };

    this.deckSize = 7;

    this.getNewCards = this.getNewCards.bind(this);
    this.returnUnselected = this.returnUnselected.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getTracks()).then(tracks => {
      this.setState(
        {
          allTracks: tracks
        },
        this.getNewCards
      );
    });
  }

  getRandomTracks(length) {
    const { allTracks } = this.state;
    const tempArray = [];
    let tempIndex = 1;

    // check we have the correct number of tracks to select from
    // if not get as many as possible
    if (length > allTracks.length) {
      length = allTracks.length;
    }

    while (tempIndex <= length) {
      // generate random index from remaining tracks
      const randId = Math.floor(Math.random() * allTracks.length);
      // pull random track
      const track = _pullAt(allTracks, randId);
      // add track to array
      tempArray.push(track[0]);
      tempIndex += 1;
    }
    // pull the random track
    return tempArray;
  }

  returnUnselected(selectedTrackId) {
    const { selectorCards, allTracks } = this.state;
    // get the two unselected cards
    const unselectedCards = selectorCards.filter(track => track.id !== selectedTrackId);
    // return the two unselected cards so they can be chosen again
    this.setState({
      allTracks: allTracks.concat(unselectedCards)
    });
  }

  getNewCards() {
    this.setState({
      selectorCards: this.getRandomTracks(3)
    });
  }

  checkProgress(selectedTrackId) {
    const { deck } = this.props.player;
    // first check if we have a full deck
    if (deck.length === this.deckSize) {
      // reset selection cards
      this.setState({ selectorCards: [] });
    } else {
      // get 3 new cards first before returning the old ones
      this.getNewCards();
    }
    this.returnUnselected(selectedTrackId);
  }

  selectCard(track) {
    const { dispatch } = this.props;

    dispatch(getTrackInfo()).then(response => {
      // get track info including audio-features from api response
      const trackWithAttribute = Object.assign(track, response);
      // add track to players deck
      dispatch(playerAddToDeck(trackWithAttribute));
      // check if we have a completed deck
      this.checkProgress(track.id);
    });
  }

  removeCard(track) {
    const { dispatch } = this.props;
    const { selectorCards, allTracks } = this.state;
    // add removed track back into original array so it can be selected again
    this.setState({
      allTracks: allTracks.push(track)
    });
    // remove track from players deck
    dispatch(playerRemoveFromDeck([track.id]));
    // re-generate the selection cards if needed
    if (!selectorCards.length) {
      this.getNewCards();
    }
  }

  render() {
    const { topTracks } = this.props;
    const { deck } = this.props.player;

    let selectorTracksElems = [];

    if (this.state.selectorCards.length) {
      selectorTracksElems = this.state.selectorCards.map(({ track }) => {
        return (
          <div key={track.id} className="cell shrink">
            <Card track={track} onSelect={this.selectCard} add noAttributes />
          </div>
        );
      });
    }

    const chosenCardElems = deck.map(track => {
      return (
        <div key={uuid()} className={styles.deckCard}>
          <Card track={track} onSelect={this.removeCard} remove showDetails />
        </div>
      );
    });

    return (
      <div className="grid-container">
        <div className="text-center">
          <h1>Build your Deck</h1>
          {topTracks.status !== 'success' ? (
            <Loader />
          ) : (
            <div>
              {deck.length < this.deckSize && (
                <div className={styles.cardSelector}>
                  <div className="grid-container">
                    <div className="grid-x grid-margin-x align-center">{selectorTracksElems}</div>
                  </div>
                </div>
              )}
              <div className={styles.currentDeck}>
                <h3>Your Deck ({chosenCardElems.length} / 7)</h3>
                <div className={styles.hand}>{chosenCardElems}</div>
              </div>
              {deck.length === this.deckSize && (
                <Link to="/fight">
                  <button className="button">Continue</button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Build.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

// ===================================
// ======= BEGIN REDUX CONNECT =======
// ===================================

function mapStateToProps(state) {
  const { topTracks, player } = state;
  return { topTracks, player };
}

const BuildLink = connect(mapStateToProps)(Build);

export default BuildLink;
