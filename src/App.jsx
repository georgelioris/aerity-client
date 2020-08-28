import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import './App.css';
import Page from './containers/page';
import {
  setError,
  setLoading,
  setLocation,
  setwData,
  setButton
} from './lib/actions';
import { formatUrl, initState, isExpired, cachedState } from './lib/helpers';
import reducer from './lib/reducer';

const hasPermissionsApi = Object.prototype.hasOwnProperty.call(
  Navigator.prototype,
  'permissions'
);

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  function getCoords(clearCache = false, useGPS = false) {
    dispatch(setLoading(true));
    if (clearCache) localStorage.removeItem('cached');
    if (useGPS) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(
            setLocation({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude
            })
          );
          dispatch(setLoading(false));
          dispatch(setButton(false));
        },
        (error) => {
          dispatch(setError({ status: true, message: error.message }));
          dispatch(setLoading(false));
        }
      );
    } else {
      (async () => {
        dispatch(setError({ status: false }));
        dispatch(setLoading(true));
        try {
          const location = await axios.get(process.env.REACT_APP_GEO_API);
          dispatch(
            setLocation({
              lat: location.data.location.lat,
              lon: location.data.location.lng
            })
          );
        } catch (error) {
          dispatch(setError({ status: true, message: error.message }));
        } finally {
          dispatch(setLoading(false));
        }
      })();
    }
  }
  useEffect(() => {
    if (hasPermissionsApi) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          getCoords(false, true);
        } else getCoords();
      });
    } else getCoords();
  }, []);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('cached'));

    async function fetchData(url) {
      dispatch(setError({ status: false }));
      dispatch(setLoading(true));
      try {
        const result = await axios.get(url);
        dispatch(setwData(result.data));
        localStorage.setItem('cached', cachedState(state.geoLoc, result.data));
      } catch (error) {
        dispatch(setError({ status: true, message: error.message }));
      } finally {
        dispatch(setLoading(false));
      }
    }

    if (localData && !isExpired(localData.ts)) {
      dispatch(setError({ status: false }));
      dispatch(setwData(JSON.parse(localData.data)));
    } else if (state.geoLoc) fetchData(formatUrl(state.geoLoc));
  }, [state.geoLoc]);
  useEffect(() => {
    /* eslint-disable no-console */
    console.log(state);
  });

  return <Page state={{ ...state, getCoords }} />;
}
export default App;
