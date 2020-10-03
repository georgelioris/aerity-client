import axios from 'axios';
import React, { useEffect, useReducer, useCallback } from 'react';
import './App.css';
import Page from './containers/page';
import { setError, setLoading, setLocation, setwData } from './lib/actions';
import { cachedState, initState, isExpired } from './lib/helpers';
import reducer from './lib/reducer';

const hasPermissionsApi = Object.prototype.hasOwnProperty.call(
  Navigator.prototype,
  'permissions'
);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const getCoords = useCallback(({ clearCache, useGPS }) => {
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
        },
        (error) => {
          dispatch(setError({ status: true, message: error.message }));
          getCoords({ useGPS: false, clearCache });
        }
      );
    } else {
      (async () => {
        dispatch(setError({ status: false }));
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
        }
      })();
    }
  }, []);

  async function fetchCoords(location) {
    const url = `/location/${location.split(',').slice(0, 2).join('/')}`;
    dispatch(setError({ status: false }));
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.get(url);
      dispatch(setwData(data));
    } catch (error) {
      dispatch(
        setError({
          status: true,
          message: error.response?.data || error.message
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  const fetchData = useCallback(
    async ({ lat, lon }) => {
      dispatch(setError({ status: false }));
      dispatch(setLoading(true));
      try {
        const result = await axiosInstance.get(
          `/weather/${lat.toFixed(4)},${lon.toFixed(4)}`
        );
        dispatch(setwData(result.data));
        localStorage.setItem('cached', cachedState(state.geoLoc, result.data));
      } catch (error) {
        dispatch(setError({ status: true, message: error.message }));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [state.geoLoc]
  );

  useEffect(() => {
    if (hasPermissionsApi) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') getCoords({ useGPS: true });
      });
    }
  }, [getCoords]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('cached'));

    if (localData && !isExpired(localData.ts)) {
      dispatch(setError({ status: false }));
      dispatch(setwData(JSON.parse(localData.data)));
    } else if (state.geoLoc) fetchData(state.geoLoc);
  }, [state.geoLoc, fetchData]);

  return <Page state={{ ...state, getCoords, fetchCoords }} />;
}
export default App;
