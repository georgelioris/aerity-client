import PropTypes from 'prop-types';
import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather/build/ReactAnimatedWeather';

const formatIcon = (icon) => icon.replace(/-/g, '_').toUpperCase();
const colors = {
  CLEAR_DAY: '#FAC863',
  CLEAR_NIGHT: '#D1D2F9',
  PARTLY_CLOUDY_DAY: '#F9E0AE',
  PARTLY_CLOUDY_NIGHT: '#D8D8FA',
  CLOUDY: '#ABACC3',
  RAIN: '#534A8D',
  SLEET: '#534A8D',
  SNOW: '#534A8D',
  WIND: '#C9CAD9',
  FOG: '#C9CAD9'
};

const WeatherIcon = ({ size, icon, animate }) => {
  return (
    <ReactAnimatedWeather
      icon={formatIcon(icon)}
      color={colors[formatIcon(icon)]}
      animate={animate || false}
      size={size}
    />
  );
};

export default WeatherIcon;

WeatherIcon.propTypes = {
  size: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  animate: PropTypes.bool
};

WeatherIcon.defaultProps = {
  animate: false
};
