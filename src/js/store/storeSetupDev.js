import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import topTracks from './reducers/topTracksReducers';
import player from './reducers/playerReducers';
import enemy from './reducers/enemyReducers';

const rootReducer = combineReducers({
  topTracks,
  player,
  enemy,
  routing: routerReducer
});

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  return store;
}
