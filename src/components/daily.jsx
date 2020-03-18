import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import ReactAnimatedWeather from 'react-animated-weather';
import { formatIcon, parseDate } from '../lib/helpers';

const Day = ({ day: { icon, time, temperatureHigh, temperatureLow } }) => (
  <Box
    direction="column"
    margin={{ top: 'large' }}
    pad={{ right: 'small', left: 'small' }}
    align="center"
  >
    <Box align="center">{parseDate(time).split(' ')[0]}</Box>
    <Box pad="medium" style={{ minWidth: '34px', minHeight: '34px' }}>
      <ReactAnimatedWeather
        icon={formatIcon(icon)}
        color="#FFEAD0"
        animate={false}
        size={32}
      />
    </Box>
    <Box align="center">
      {`${Math.round(temperatureHigh)}°/${Math.round(temperatureLow)}°`}
    </Box>
  </Box>
);

const Daily = ({ daily: { data } }) => (
  <Box
    pad={{ top: 'large' }}
    width="large"
    direction="row"
    align="center"
    wrap
    justify="between"
    alignContent="center"
  >
    {data.map((day, _) => _ !== 0 && <Day key={day.time} day={day} />)}
  </Box>
);

Daily.propTypes = {
  daily: PropTypes.shape({
    summary: PropTypes.string,
    icon: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  })
};
Day.propTypes = {
  day: PropTypes.shape({
    time: PropTypes.number,
    icon: PropTypes.string,
    temperatureHigh: PropTypes.number,
    temperatureLow: PropTypes.number
  })
};
Daily.defaultProps = {
  daily: undefined
};
Day.defaultProps = {
  day: undefined
};

export default Daily;
