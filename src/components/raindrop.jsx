import { Box } from 'grommet';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const calcVolume = (value, unit) => {
  const isSi = unit === 'si' || unit === 'ca' || unit === 'uk2';
  const steps = isSi ? [0, 2.5, 7.6, 10, 50] : [0, 0.098, 0.3, 0.39, 2];
  const scale = steps.reduce((acc, step, idx) => {
    if (value > step) return idx + 1;
    if (value === step) return idx;
    return acc;
  }, 0);
  const percentage = (value * scale * 25) / steps[scale];

  return `${Math.round(percentage)}%`;
};

const Drop = ({ volume, id }) => (
  <svg width="30px" height="42px" viewBox="0 0 30 42">
    <linearGradient id={id} x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0%" stopOpacity="1" stopColor="#7796CB" />
      <stop offset={volume} stopOpacity="1" stopColor="#7796CB" />
      <stop offset={volume} stopOpacity="0" stopColor="#7796CB" />
      <stop offset="100%" stopOpacity="0" stopColor="#7796CB" />
    </linearGradient>
    <path
      fill={`url(#${id})`}
      stroke="#7796CB"
      strokeWidth="1.5"
      d="M15 3
           Q16.5 6.8 25 18
           A12.8 12.8 0 1 1 5 18
           Q13.5 6.8 15 3z"
    />
  </svg>
);

const RainDrop = ({ precipIntensity, units, id }) => {
  const [volume, setVolume] = useState('0%');
  useEffect(() => {
    if (precipIntensity === 0) setVolume('0%');
    else if (precipIntensity > 50) setVolume('100%');
    else setVolume(calcVolume(precipIntensity, units));
  }, [precipIntensity, units]);

  return (
    <Box>
      <Drop volume={volume} id={id} />
    </Box>
  );
};

export default RainDrop;

Drop.propTypes = {
  volume: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

RainDrop.propTypes = {
  precipIntensity: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
