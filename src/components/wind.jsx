import { Box, Text } from 'grommet';
import { Waypoint } from 'grommet-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { isSI } from '../lib/helpers';
import Section from './section';

export const formatWSpeed = (units) => (speed) =>
  units === 'si' ? Math.round(speed * 3.6) : Math.round(speed);
const labelDate = (seconds) =>
  new Intl.DateTimeFormat('en', {
    hour: 'numeric'
  }).format(new Date(0).setUTCSeconds(seconds));

const getSteps = (units) =>
  units === 'si' || units === 'ca'
    ? [0, 1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117]
    : [0, 1, 3, 7, 12, 18, 24, 31, 38, 46, 54, 63, 72, 73];

const windScale = (speed, steps) =>
  steps.reduce((acc, step, idx) => (speed >= step ? idx : acc), 0);

const windLabel = (speed, units) => {
  const labels = [
    'Calm',
    'Light air',
    'Light breeze',
    'Gentle breeze',
    'Moderate breeze',
    'Fresh breeze',
    'High wind,',
    'Gale',
    'Strong gale',
    'Storm',
    'Violent storm',
    'Hurricane force'
  ];
  const scale = windScale(speed, getSteps(units));
  return labels[scale];
};

const labelColor = (speed, units) => {
  const colors = [
    'dark-5',
    '#AEF1F9',
    '#96F7DC',
    '#96F7B4',
    '#6FF46F',
    '#73ED12',
    '#A4ED12',
    '#DAED12',
    '#EDC212',
    '#ED8F12',
    '#ED6312',
    '#ED2912',
    '#D5102D'
  ];
  const scale = windScale(speed, getSteps(units));
  return colors[scale];
};

const windDirection = (deg) => {
  const directions = [
    'north',
    'northeast',
    'east',
    'southeast',
    'south',
    'southwest',
    'west',
    'nortwest'
  ];

  const steps = ['0', '45', '90', '135', '180', '225', '270', '315'];
  const scale = windScale(deg, steps);
  return directions[scale];
};

export const windEntry = (units) => (speed, bearing) =>
  `${windLabel(speed, units)}, ${formatWSpeed(units)(speed)} ${
    isSI(units) ? 'km/h' : 'mph'
  }, ${windDirection(bearing)} `;

const Wind = ({ hours, units, currentWindSpeed, currentWindBearing }) => {
  const formatSpeed = formatWSpeed(units);
  const formatedCurrentSpeed = `${formatSpeed(currentWindSpeed)}`;
  const labelUnits = isSI(units) ? 'km/h' : 'mph';
  return (
    <Section title="Wind" overflow>
      <Box direction="row" justify="start">
        <Box direction="column" alignContent="start">
          <Text size="2.8rem" a11yTitle={formatedCurrentSpeed}>
            <b>{formatedCurrentSpeed}</b>
          </Text>
        </Box>
        <Box
          direction="column"
          align="center"
          justify="end"
          pad={{ bottom: '0.4rem', horizontal: 'small' }}
        >
          <Waypoint
            color="dark-5"
            size="1.2rem"
            style={{
              transform: `rotate(${currentWindBearing + 135}deg)`
            }}
          />
          <Text
            size="0.9rem"
            margin={{ top: '10px' }}
            color="dark-5"
            a11yTitle={labelUnits}
          >
            {labelUnits}
          </Text>
        </Box>
        <Box
          direction="column"
          justify="start"
          alignSelf="center"
          pad={{ bottom: '0.4rem' }}
        >
          <Text
            a11yTitle={windLabel(formatedCurrentSpeed, units)}
            style={{
              borderBottom: `5px solid ${labelColor(
                formatedCurrentSpeed,
                units
              )}`
            }}
          >
            {windLabel(formatedCurrentSpeed, units)}
          </Text>

          <Text color="dark-5" size="0.8rem" a11yTitle="Now">
            {`Now ${String.fromCharCode(0x2022)} From ${windDirection(
              currentWindBearing
            )}`}
          </Text>
        </Box>
      </Box>
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '100vw',
          paddingBottom: '1rem'
        }}
      >
        <div style={{ minWidth: '48em' }}>
          <Box
            direction="row"
            justify="between"
            pad={{ top: 'medium', right: 'medium' }}
            width={{ min: '100rem' }}
          >
            {hours.map(({ time, windSpeed, windBearing }) => {
              const formatedSpeed = `${formatSpeed(windSpeed)}`;
              const timeStamp = labelDate(time);
              const labelBg = labelColor(formatedSpeed, units);
              return (
                <Box direction="column" key={time} align="center">
                  <Waypoint
                    color="dark-5"
                    size="1rem"
                    style={{
                      transform: `rotate(${windBearing + 135}deg)`,
                      margin: '10px'
                    }}
                  />
                  <Box
                    align="center"
                    justify="center"
                    width="100%"
                    height="2rem"
                    background={labelBg}
                    style={{
                      borderTopLeftRadius: '0.5rem',
                      borderTopRightRadius: '0.5rem'
                    }}
                  >
                    <Text size="small" a11yTitle={formatedSpeed}>
                      <b>{formatedSpeed}</b>
                    </Text>
                  </Box>
                  <Text size="small" color="dark-5" a11yTitle={timeStamp}>
                    {timeStamp}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </div>
      </div>
    </Section>
  );
};

export default Wind;

Wind.propTypes = {
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      windSpeed: PropTypes.number,
      windBearing: PropTypes.number
    })
  ).isRequired,
  units: PropTypes.string.isRequired,
  currentWindSpeed: PropTypes.number.isRequired,
  currentWindBearing: PropTypes.number.isRequired
};
