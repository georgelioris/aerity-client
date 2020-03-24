import axios from 'axios';
import cuid from 'cuid';
import Cookies from 'js-cookie';
import React, { useEffect, useReducer } from 'react';
import './App.css';
import Page from './containers/page';
import { setError, setLoading, setLocation, setwData } from './lib/actions';
import {
  formatQuery,
  formatUrl,
  initState,
  isExpired,
  cachedState
} from './lib/helpers';
import reducer from './lib/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const appId = Cookies.get('appId');
    const localData = JSON.parse(localStorage.getItem('cached'));

    async function fetchData(url, id) {
      dispatch(setError({ status: false }));
      dispatch(setLoading(true));
      try {
        const result = await axios.get(url, { params: { APPID: id } });
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
      const url = formatUrl(formatQuery(state.geoLoc));
      fetchData(url, appId);
    }
  }, [state.geoLoc]);

  useEffect(() => {
    if (!Cookies.get('appId')) Cookies.set('appId', cuid());

    dispatch(setLoading(true));
    navigator.geolocation.getCurrentPosition(
      pos => {
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

  return <Page state={state} />;
}
export default App;
