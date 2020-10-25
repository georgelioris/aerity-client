import axios from 'axios';
import React, { useEffect, useReducer, useMemo } from 'react';
import './App.css';
import Page from './containers/page';
import {
  getLocation,
  getDataByName,
  getDataByCoords,
  onGeoLocationChange
} from './lib/actions';
import { initState, setCache } from './lib/helpers';
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

  const getCoords = useMemo(() => getLocation(dispatch, axios), []);
  const fetchCoords = useMemo(() => getDataByName(dispatch, axiosInstance), []);
  const fetchData = useMemo(
    () => getDataByCoords(dispatch, axiosInstance, setCache(state.geoLoc)),
    [state.geoLoc]
  );
  const onGeoLocChange = useMemo(() => onGeoLocationChange(dispatch), []);

  useEffect(() => {
    if (hasPermissionsApi) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') getCoords({ useGPS: true });
      });
    }
  }, [getCoords]);

  useEffect(() => {
    onGeoLocChange(fetchData, state.geoLoc);
  }, [onGeoLocChange, fetchData, state.geoLoc]);

  return <Page state={{ ...state, getCoords, fetchCoords }} />;
}
export default App;
