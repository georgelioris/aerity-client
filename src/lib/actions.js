import { isExpired } from './helpers';

export const setLoading = (value) => ({
  type: 'SET_LOADING',
  value
});
export const setError = (value) => ({
  type: 'SET_ERROR',
  value
});
export const setLocation = (value) => ({
  type: 'SET_LOCATION',
  value
});
export const setwData = (value) => ({
  type: 'SET_WDATA',
  value
});

export const getLocation = (dispatch, axios) => ({ clearCache, useGPS }) => {
  if (clearCache) localStorage.removeItem('cached');
  dispatch(setLoading(true));
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
        getLocation(dispatch, axios)({ useGPS: false, clearCache });
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
        dispatch(setLoading(false));
        dispatch(setError({ status: true, message: error.message }));
      }
    })();
  }
};

export const getDataByName = (dispatch, axiosInstance) => async (location) => {
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
};

export const getDataByCoords = (dispatch, axiosInstance, setCache) => async ({
  lat,
  lon
}) => {
  dispatch(setError({ status: false }));
  dispatch(setLoading(true));
  try {
    const result = await axiosInstance.get(
      `/weather/${lat.toFixed(4)},${lon.toFixed(4)}`
    );
    dispatch(setwData(result.data));
    setCache(result.data);
  } catch (error) {
    dispatch(setError({ status: true, message: error.message }));
  } finally {
    dispatch(setLoading(false));
  }
};

export const onGeoLocationChange = (dispatch) => (fetchData, geoLoc) => {
  const localData = JSON.parse(localStorage.getItem('cached'));

  if (localData && !isExpired(localData.ts)) {
    dispatch(setwData(JSON.parse(localData.data)));
  } else if (geoLoc) fetchData(geoLoc);
};
