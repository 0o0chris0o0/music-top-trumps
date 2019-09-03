import {
  PLAYER_ADD_TO_HAND,
  PLAYER_REMOVE_FROM_HAND,
  PLAYER_ADD_TO_DECK,
  PLAYER_REMOVE_FROM_DECK,
  PLAYER_ADD_TO_DISCARD
} from '../actions/playerActions';
import { remove as _remove } from 'lodash';

const initialState = {
  hand: [],
  deck: [],
  discard: []
};

export default function users(state = initialState, action) {
  // duplicate current state to avoid mutating original state object;
  const tempState = Object.assign({}, state);

  switch (action.type) {
    case PLAYER_ADD_TO_HAND:
      const tempHand = tempState.hand.concat(action.track);
      tempState.hand = tempHand;
      return tempState;

    case PLAYER_REMOVE_FROM_HAND:
      _remove(tempState.hand, card => action.trackId === card.id);
      return tempState;

    case PLAYER_ADD_TO_DECK:
      const tempDeck = tempState.deck.concat(action.track);
      tempState.deck = tempDeck;
      return tempState;

    case PLAYER_REMOVE_FROM_DECK:
      _remove(tempState.deck, card => action.trackId.includes(card.id));
      return tempState;

    case PLAYER_ADD_TO_DISCARD:
      const tempDiscard = tempState.discard.concat(action.track);
      tempState.discard = tempDiscard;
      return tempState;

    default:
      return state;
  }
}
