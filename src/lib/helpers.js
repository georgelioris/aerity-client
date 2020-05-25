export const dskyKey = process.env.REACT_APP_DARKSKY_API_KEY;
export const formatUrl = query =>
  `https://aerity-server.netlify.app/.netlify/functions/server/weather/${query}`;
export const formatQuery = ({ lat, lon }) => {
  return `${lat.toFixed(4)}-${lon.toFixed(4)}`;
};
export const formatIcon = icon => icon.replace(/-/g, '_').toUpperCase();
export const parseDate = seconds =>
  new Date(new Date(0).setUTCSeconds(seconds)).toDateString();
export const parseTemp = (val, units) =>
  `${Math.round(val)}${units === 'si' ? '°C' : '°F'}`;
export const initState = {
  isLoading: false,
  isError: { status: false, message: '' },
  geoLoc: null,
  wData: null
};
export const isExpired = miliseconds => Date.now() - miliseconds > 300000;
export const cachedState = (loc, data) =>
  JSON.stringify({
    geoLoc: loc,
    data: JSON.stringify(data),
    ts: Date.now()
  });
