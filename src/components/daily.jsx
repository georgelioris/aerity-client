import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import ReactAnimatedWeather from 'react-animated-weather';
import { formatIcon, parseDate } from '../lib/helpers';
// import { Box, Heading } from 'grommet';
// import ReactAnimatedWeather from 'react-animated-weather';
// import { formatIcon, parseDate, parseTemp } from '../lib/helpers';

const Day = ({ day: { icon, time, temperatureHigh, temperatureLow } }) => (
  <Box direction="column" alignContent="center" pad={{ top: 'large' }}>
    <Box style={{ margin: '0 auto' }}>{parseDate(time).split(' ')[0]}</Box>
    <Box pad="medium" style={{ minWidth: '34px', minHeight: '34px' }}>
      <ReactAnimatedWeather
        icon={formatIcon(icon)}
        color="#FFEAD0"
        animate={false}
        size={34}
      />
    </Box>
    <Box style={{ margin: '0 auto' }}>
      {`${Math.round(temperatureHigh)}°/${Math.round(temperatureLow)}°`}
    </Box>
  </Box>
);

const Daily = ({ daily }) => {
  const { data } = daily;
  const days = data.map(
    (day, _) => _ !== 0 && <Day key={day.time} day={day} />
  );
  return (
    <>
      <Box
        pad={{ top: 'large' }}
        direction="row"
        wrap
        justify="between"
        style={{ margin: '0 auto' }}
      >
        {days}
      </Box>
    </>
  );
};
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
