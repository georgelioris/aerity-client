import { Box, Heading, Text, ResponsiveContext } from 'grommet';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import WeatherIcon from './weatherIcon';
import { parseDate, displayHighLow, isSI } from '../lib/helpers';

const displayApparentTemp = (temp) =>
  `${Math.round(temp)}${String.fromCharCode(176)}`;
const calcDate = (offset) =>
  parseDate(Math.round(new Date().getTime() / 1000) + Number(offset), {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

const LeftBox = ({
  temp,
  timezone,
  location,
  units,
  apparentTemp,
  apparentH,
  apparentL,
  size
}) => {
  const apparentT = displayApparentTemp(apparentTemp);
  return (
    <Box direction="column" pad="medium">
      <Heading level="3" margin="none" color="white">
        {location}
      </Heading>
      <Heading
        level="4"
        margin="none"
        color="#F8F8FA"
        size={size === 'small' ? 'xxsmall' : 'medium'}
        style={{ fontWeight: '400' }}
      >
        {calcDate(timezone)}
      </Heading>
      <Heading level="1" margin="none" size="large">
        {Math.round(temp)}
        <Text
          size={size !== 'small' ? 'xlarge' : 'small'}
          style={{ position: 'absolute' }}
          margin={{ top: `${size === 'small' ? '0.6rem' : '0.8rem'}` }}
        >
          {String.fromCharCode(isSI(units) ? 8451 : 8457)}
        </Text>
      </Heading>
      <Heading level="5" margin="none" style={{ fontWeight: '400' }}>
        {`Feels like ${apparentT}`}
      </Heading>
      <Heading level="5" margin="none" style={{ fontWeight: '400' }}>
        {displayHighLow(apparentH, apparentL)}
      </Heading>
    </Box>
  );
};

const RightBox = ({ icon, summary, size }) => {
  return (
    <Box
      direction="column"
      pad="medium"
      margin={{ top: 'xxsmall' }}
      align="center"
    >
      <Box style={{ width: 'auto' }}>
        <WeatherIcon icon={icon} animate size={size === 'small' ? 96 : 144} />
      </Box>
      <Heading level="3" margin="none">
        {summary}
      </Heading>
    </Box>
  );
};

const Currently = ({
  currently: {
    summary,
    icon,
    location,
    timezone,
    temperature,
    apparentTemperature,
    units,
    today: { apparentTemperatureHigh, apparentTemperatureLow }
  }
}) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      id="currently"
      pad={size === 'small' ? 'none' : size}
      width="large"
      direction="row"
      justify="between"
      animation="fadeIn"
      wrap
    >
      <LeftBox
        temp={temperature}
        location={location}
        timezone={timezone}
        units={units}
        apparentTemp={apparentTemperature}
        apparentH={apparentTemperatureHigh}
        apparentL={apparentTemperatureLow}
        size={size}
      />
      <RightBox icon={icon} summary={summary} size={size} />
    </Box>
  );
};

LeftBox.propTypes = {
  temp: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  timezone: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
  apparentTemp: PropTypes.number.isRequired,
  apparentH: PropTypes.number.isRequired,
  apparentL: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired
};

RightBox.propTypes = {
  icon: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

Currently.propTypes = {
  currently: PropTypes.shape({
    timezone: PropTypes.number,
    location: PropTypes.string,
    icon: PropTypes.string,
    temperature: PropTypes.number,
    apparentTemperature: PropTypes.number,
    summary: PropTypes.string,
    units: PropTypes.string,
    today: PropTypes.shape({
      apparentTemperatureHigh: PropTypes.number,
      apparentTemperatureLow: PropTypes.number
    })
  })
};

Currently.defaultProps = {
  currently: null
};

export default Currently;
