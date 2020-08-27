import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import './App.css';
import Page from './containers/page';
import { setError, setLoading, setLocation, setwData } from './lib/actions';
import { formatUrl, initState, isExpired, cachedState } from './lib/helpers';
import reducer from './lib/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
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
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
      }
    })();
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
    } else if (state.geoLoc) {
      fetchData(formatUrl(state.geoLoc));
    }
  }, [state.geoLoc]);

  function getCoords() {
    dispatch(setLoading(true));
    navigator.geolocation.getCurrentPosition(
      pos => {
        localStorage.removeItem('cached');
        dispatch(
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        );
        dispatch(setLoading(false));
      },
      error => {
        dispatch(setError({ status: true, message: error.message }));
        dispatch(setLoading(false));
      }
    );
  }, []);

  return <Page state={{ ...state, getCoords }} />;
}
export default App;
