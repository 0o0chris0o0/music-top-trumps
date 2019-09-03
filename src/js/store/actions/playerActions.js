export const PLAYER_ADD_TO_HAND       = 'PLAYER_ADD_TO_HAND';
export const PLAYER_REMOVE_FROM_HAND  = 'PLAYER_REMOVE_FROM_HAND';
export const PLAYER_ADD_TO_DECK       = 'PLAYER_ADD_TO_DECK';
export const PLAYER_REMOVE_FROM_DECK  = 'PLAYER_REMOVE_FROM_DECK';
export const PLAYER_ADD_TO_DISCARD    = 'PLAYER_ADD_TO_DISCARD';

export function playerAddToHand(track) {
  return {
    type: PLAYER_ADD_TO_HAND,
    track
  };
}

export function playerRemoveFromHand(trackId) {
  return {
    type: PLAYER_REMOVE_FROM_HAND,
    trackId
  };
}

export function playerAddToDeck(track) {
  return {
    type: PLAYER_ADD_TO_DECK,
    track
  };
}

export function playerRemoveFromDeck(trackId) {
  return {
    type: PLAYER_REMOVE_FROM_DECK,
    trackId
  };
}

export function playerAddToDiscard(track) {
  return {
    type: PLAYER_ADD_TO_DISCARD,
    track
  };
}
