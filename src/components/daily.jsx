import { Box, Text, Collapsible } from 'grommet';
import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { parseUvIndex } from '../lib/helpers';
import { windEntry } from './wind';
import Section from './section';
import WeatherIcon from './weatherIcon';

const labelTemp = (temp) => `${Math.round(temp)}${String.fromCharCode(176)}`;

const DayExpand = ({
  day: {
    precipProbability,
    humidity,
    uvIndex,
    sunriseTime,
    sunsetTime,
    windBearing,
    windSpeed
  },
  open,
  units,
  formatDate
}) => {
  const entries = useMemo(() => {
    const labelDate = (seconds) =>
      formatDate(seconds, {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
      });
    return [
      ['Wind', `${windEntry(units)(windSpeed, windBearing)}`],
      ['Humidity', `${Math.round(humidity * 100)}%`],
      ['UV Index', parseUvIndex(uvIndex)],
      ['Sunrise/sunset', `${labelDate(sunriseTime)}, ${labelDate(sunsetTime)}`],
      precipProbability > 0.3 && [
        'Chance of rain',
        `${Math.round(precipProbability * 100)}%`
      ]
    ];
  }, [
    precipProbability,
    humidity,
    uvIndex,
    sunriseTime,
    sunsetTime,
    windBearing,
    windSpeed,
    units,
    formatDate
  ]);
  return (
    <Collapsible open={open}>
      <Box direction="row" gap="xlarge" margin={{ top: 'medium' }}>
        <Box
          direction="column"
          alignSelf="start"
          margin={{ bottom: 'xsmall' }}
          gap="0.15rem"
        >
          {entries.map((entry) => (
            <Text size="0.9rem" color="dark-5" key={entry[0] || '-1'}>
              {entry[0]}
            </Text>
          ))}
        </Box>
        <Box direction="column" alignSelf="start" gap="0.15rem">
          {entries.map((entry) => (
            <Text size="0.9rem" key={entry[0] || '-1'}>
              {entry[1]}
            </Text>
          ))}
        </Box>
      </Box>
    </Collapsible>
  );
};

const Day = ({
  day: { icon, time, temperatureHigh, temperatureLow, summary },
  units,
  day,
  formatDate
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      pad={{ horizontal: 'small', vertical: 'medium' }}
      elevation="xsmall"
      onClick={() => setOpen(!open)}
    >
      <Box
        direction="row"
        align="center"
        justify="between"
        margin={{ bottom: 'xsmall' }}
      >
        <Box
          align="start"
          direction="column"
          gap="small"
          width="calc(100% - 120px)"
        >
          <Text size="1rem">
            <b>{formatDate(time, { timeZone: 'UTC', weekday: 'long' })}</b>
          </Text>
          <Text size="1rem" color="dark-5">
            {summary}
          </Text>
        </Box>
        <Box direction="row" width="100px" justify="end">
          <Box align="center" direction="row" gap="small">
            <Box style={{ minWidth: '51px', minHeight: '51px' }}>
              <WeatherIcon icon={icon} animate={false} size={51} />
            </Box>

            <Box direction="column">
              <Text size="1rem">{labelTemp(temperatureHigh)}</Text>
              <Text size="1rem" color="dark-5">
                {labelTemp(temperatureLow)}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <DayExpand day={day} open={open} units={units} formatDate={formatDate} />
    </Box>
  );
};

const Daily = ({ daily: { data, summary }, units, formatDate }) => (
  <Box background="#f8f8f8" pad={{ bottom: 'medium' }}>
    <Section title="This week" pad="none">
      <Box style={{ textAlign: 'center' }} margin={{ bottom: 'medium' }}>
        <Text color="dark-5">{summary}</Text>
      </Box>
      {data.slice(1).map((day) => (
        <Day key={day.time} day={day} units={units} formatDate={formatDate} />
      ))}
    </Section>
  </Box>
);

DayExpand.propTypes = {
  day: PropTypes.shape({
    precipProbability: PropTypes.number,
    humidity: PropTypes.number,
    uvIndex: PropTypes.number,
    sunriseTime: PropTypes.number,
    sunsetTime: PropTypes.number,
    windBearing: PropTypes.number,
    windSpeed: PropTypes.number
  }),
  units: PropTypes.string.isRequired,
  open: PropTypes.bool,
  formatDate: PropTypes.func.isRequired
};

Day.propTypes = {
  day: PropTypes.shape({
    time: PropTypes.number,
    icon: PropTypes.string,
    temperatureHigh: PropTypes.number,
    temperatureLow: PropTypes.number,
    summary: PropTypes.string
  }),
  units: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired
};

Daily.propTypes = {
  daily: PropTypes.shape({
    icon: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    summary: PropTypes.string
  }),
  units: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired
};

DayExpand.defaultProps = {
  day: undefined,
  open: false
};
Day.defaultProps = {
  day: undefined
};
Daily.defaultProps = {
  daily: undefined
};

export default Daily;
