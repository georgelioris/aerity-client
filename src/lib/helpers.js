// export const errorHandler = fnDisp => (fnErr, value = true) => (
//   fnLoad,
//   value = false
// ) => fn => (...params) =>
//   fn(...params)
//     .catch(e => fnDisp(fnErr(value)))
//     .finally(() => fnDisp(fnLoad(!value)));
// export const owmKey = process.env.REACT_APP_OWM_API_KEY;
// export const baseUrl = `http://api.openweathermap.org/data/2.5/weather?`;
// `https://aerity-server.netlify.com/.netlify/functions/server/weather/${query}`;
export const dskyKey = process.env.REACT_APP_DARKSKY_API_KEY;
export const formatUrl = (query, opts = '&units=metric') =>
  `http://localhost:3456/weather/${query}`;
export const formatQuery = ({ lat, lon }) => {
  return `${lat.toFixed(4)}-${lon.toFixed(4)}`;
};
export const formatIcon = icon => icon.replace(/-/g, '_').toUpperCase();
export const parseDate = seconds =>
  new Date(new Date(0).setUTCSeconds(seconds)).toDateString();
export const parseTemp = (val, units) =>
  `${Math.floor(val)}${units === 'si' ? '°C' : '°F'}`;
export const initState = {
  isLoading: false,
  isError: { status: false, info: '' },
  geoLoc: null,
  wData: null,
  errMessage: ''
};
