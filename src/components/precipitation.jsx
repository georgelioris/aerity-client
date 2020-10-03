import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import RainDrop from './raindrop';
import Section from './section';

const labelPrecip = (precipInt) => {
  const precip = Number(precipInt.toFixed(2));
  return precip > 0 && precip < 0.01 ? '< 0.01' : precip || '-';
};

const Precipitation = ({ hours, units, formatDate }) => (
  <Section title="Precipitation" overflow>
    <div className="overflow-container">
      <Box
        direction="row"
        justify="between"
        align="center"
        pad={{ right: 'medium' }}
        width={{ min: '100rem' }}
      >
        <Box
          direction="column"
          align="start"
          justify="between"
          gap="large"
          pad={{ right: 'none' }}
        >
          <Text size="small" color="rgba(46, 41, 78, 0.6)">
            Chance
          </Text>
          <Text size="small" color="rgba(46, 41, 78, 0.6)">
            Volume
            <br />
            (mm)
          </Text>
        </Box>
        {hours.map(({ time, precipIntensity, precipProbability }) => (
          <Box direction="column" key={time} align="center" gap="xsmall">
            <Text size="xsmall">
              {`${Math.round(precipProbability * 100)}%`}
            </Text>
            <RainDrop
              precipIntensity={Number(precipIntensity)}
              units={units}
              id={time}
            />
            <Text size="xsmall">{labelPrecip(precipIntensity)}</Text>
            <Text size="small" color="rgba(46, 41, 78, 0.6)">
              {formatDate(time)}
            </Text>
          </Box>
        ))}
      </Box>
    </div>
  </Section>
);

export default Precipitation;

Precipitation.propTypes = {
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      precipIntensity: PropTypes.number,
      precipProbability: PropTypes.number
    })
  ),
  units: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired
};

Precipitation.defaultProps = {
  hours: undefined
};
