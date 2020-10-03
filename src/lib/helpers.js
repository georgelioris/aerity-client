export const formatUrl = ({ lat, lon }) =>
  `${lat.toFixed(4)},${lon.toFixed(4)}`;
export const parseDate = (
  seconds,
  options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
) =>
  new Intl.DateTimeFormat('en', options).format(
    new Date(0).setUTCSeconds(seconds)
  );
export const displayHighLow = (tmpH, tmpL) => {
  const [degSymbol, dotSymbol, upArrow, downArrow] = String.fromCharCode(
    176,
    0x2022,
    8593,
    8595
  );
  const [high, low] = [tmpH, tmpL].map((temp) => Math.round(temp) + degSymbol);
  return `${high}${upArrow} ${dotSymbol} ${low}${downArrow}`;
};
export const initState = {
  isLoading: false,
  isError: { status: false, message: '' },
  geoLoc: null,
  wData: null
};
export const isExpired = (miliseconds) => Date.now() - miliseconds > 300000;
export const cachedState = (loc, data) =>
  JSON.stringify({
    geoLoc: loc,
    data: JSON.stringify(data),
    ts: Date.now()
  });
export const isSI = (units) =>
  units === 'si' || units === 'ca' || units === 'uk2';
export const toKelvin = (units) => (degrees) =>
  isSI(units) ? degrees + 273 : ((degrees + 459.67) * 5) / 9;
export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseUvIndex = (uvidx) => {
  const steps = [0, 3, 6, 8, 11];
  const labels = ['Low', 'Moderate', 'High', 'Very High', 'Extreme'];
  const scale = steps.reduce(
    (acc, step, idx) => (uvidx >= step ? idx : acc),
    4
  );
  return `${labels[scale]}, ${uvidx}`;
};
