import { TRACKS_REQUEST, TRACKS_SUCCESS, TRACKS_FAILURE } from '../actions/topTracksActions';

const initialState = {
  status: 'idle'
};

export default function topTracks(state = initialState, action) {
  switch (action.type) {
    case TRACKS_REQUEST:
      return { ...state, status: 'connecting' };
    case TRACKS_SUCCESS:
      return { ...state, status: 'success', topTracks: action.topTracks };
    case TRACKS_FAILURE:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}
