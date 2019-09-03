import exampleTracks from '../../exampleData/tracks.json';
import exampleFeatures from '../../exampleData/trackFeatures.json';

export const TRACKS_REQUEST = 'TRACKS_REQUEST';
export const TRACKS_SUCCESS = 'TRACKS_SUCCESS';
export const TRACKS_FAILURE = 'TRACKS_FAILURE';
export const TRACK_INFO_REQUEST = 'TRACK_INFO_REQUEST';
export const TRACK_INFO_SUCCESS = 'TRACK_INFO_SUCCESS';
export const TRACK_INFO_FAILURE = 'TRACK_INFO_FAILURE';

export const getTrackInfo = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: TRACK_INFO_REQUEST
    });

    dispatch({
      type: TRACK_INFO_SUCCESS
    });
    // generate a random ID between 0 - 5
    const randId = Math.floor(Math.random() * Math.floor(exampleFeatures.length));
    const trackFeatures = exampleFeatures[randId];
    resolve(trackFeatures);
  });

export const getTracks = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: TRACKS_REQUEST
    });

    // simulate getting tracks from user
    dispatch({
      type: TRACKS_SUCCESS,
      topTracks: exampleTracks
    });
    resolve(exampleTracks);
  });
