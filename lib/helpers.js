export const gotData = obj => Object.entries(obj).length !== 0;
export const errorHandler = fnDisp => (fnErr, value = true) => (
  fnLoad,
  value = false
) => fn => (...params) =>
  fn(...params)
    .catch(e => fnDisp(fnErr(value)))
    .finally(() => fnDisp(fnLoad(!value)));
//export const owmKey = process.env.REACT_APP_OWM_API_KEY;
//export const baseUrl = `http://api.openweathermap.org/data/2.5/weather?`;
export const dskyKey = process.env.REACT_APP_DARKSKY_API_KEY;
export const formatUrl = (
  query,
  opts = '&units=metric',
  owmKey = process.env.REACT_APP_OWM_API_KEY
) => `http://localhost:3456/weather/${query}`;
export const formatQuery = ({ lat, long }) => {
  return `${lat.toPrecision(6)}-${long.toPrecision(6)}`;
};

export const initState = {
  isLoading: false,
  isError: { status: false, info: '' },
  geoLoc: null,
  wData: null,
  errMessage: ''
};
