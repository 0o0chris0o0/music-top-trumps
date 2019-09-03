import {
  ENEMY_ADD_TO_HAND,
  ENEMY_REMOVE_FROM_HAND,
  ENEMY_ADD_TO_DECK,
  ENEMY_REMOVE_FROM_DECK,
  ENEMY_ADD_TO_DISCARD
} from '../actions/enemyActions';
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
    case ENEMY_ADD_TO_HAND:
      const tempHand = tempState.hand.concat(action.track);
      tempState.hand = tempHand;
      return tempState;

    case ENEMY_REMOVE_FROM_HAND:
      _remove(tempState.hand, card => action.trackId === card.id);
      return tempState;

    case ENEMY_ADD_TO_DECK:
      const tempDeck = tempState.deck.concat(action.track);
      tempState.deck = tempDeck;
      return tempState;

    case ENEMY_REMOVE_FROM_DECK:
      _remove(tempState.deck, card => action.trackId.includes(card.id));
      return tempState;

    case ENEMY_ADD_TO_DISCARD:
      const tempDiscard = tempState.discard.concat(action.track);
      tempState.discard = tempDiscard;
      return tempState;

    default:
      return state;
  }
}
