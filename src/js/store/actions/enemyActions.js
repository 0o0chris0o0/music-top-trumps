import exampleTracks from '../../exampleData/tracks.json';
import exampleFeatures from '../../exampleData/trackFeatures.json';

export const ENEMY_ADD_TO_HAND = 'ENEMY_ADD_TO_HAND';
export const ENEMY_REMOVE_FROM_HAND = 'ENEMY_REMOVE_FROM_HAND';
export const ENEMY_ADD_TO_DECK = 'ENEMY_ADD_TO_DECK';
export const ENEMY_REMOVE_FROM_DECK = 'ENEMY_REMOVE_FROM_DECK';
export const ENEMY_ADD_TO_DISCARD = 'ENEMY_ADD_TO_DISCARD';
export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

export function enemyAddToHand(track) {
  return {
    type: ENEMY_ADD_TO_HAND,
    track
  };
}

export function enemyRemoveFromHand(trackId) {
  return {
    type: ENEMY_REMOVE_FROM_HAND,
    trackId
  };
}

export function enemyAddToDeck(track) {
  return {
    type: ENEMY_ADD_TO_DECK,
    track
  };
}

export function enemyRemoveFromDeck(trackId) {
  return {
    type: ENEMY_REMOVE_FROM_DECK,
    trackId
  };
}

export function enemyAddToDiscard(track) {
  return {
    type: ENEMY_ADD_TO_DISCARD,
    track
  };
}

export const getEnemyTracks = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: GET_TRACKS_REQUEST
    });

    // simulate getting tracks for enemy
    dispatch({
      type: GET_TRACKS_SUCCESS
    });

    // generate a random ID between 0 - 5
    const tracksWithAttributes = exampleTracks.map(({ track }) => {
      const randId = Math.floor(Math.random() * Math.floor(exampleFeatures.length));
      const trackFeatures = exampleFeatures[randId];
      return Object.assign(track, trackFeatures);
    });

    debugger;

    resolve(tracksWithAttributes);
  });
