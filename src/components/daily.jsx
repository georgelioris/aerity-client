import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import { formatIcon, parseDate } from '../lib/helpers';
import Detailed from './detailed';

const Day = ({
  day: { icon, time, temperatureHigh, temperatureLow, id },
  handleDayInfo,
  dayInfo
}) => {
  return (
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
      <Box align="center">
        <Button
          color="#FFEAD0"
          plain
          size="small"
          label={dayInfo !== id ? 'More' : 'Less'}
          onClick={handleDayInfo}
        />
      </Box>
    </Box>
  );
};
const Daily = ({ daily: { data } }) => {
  const [dayInfo, setDayInfo] = useState(null);
  return (
    <Box
      pad={{ top: 'large' }}
      width="large"
      direction="row"
      align="center"
      wrap
      justify="between"
      alignContent="center"
    >
      {data.map(
        (day, index) =>
          index !== 0 && (
            <Day
              key={day.time}
              day={{ ...day, id: index }}
              handleDayInfo={() => setDayInfo(index)}
              dayInfo={dayInfo}
            />
          )
      )}
      {dayInfo && (
        <Detailed data={data[dayInfo]} removeDayInfo={() => setDayInfo(null)} />
      )}
    </Box>
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
    id: PropTypes.number,
    time: PropTypes.number,
    icon: PropTypes.string,
    temperatureHigh: PropTypes.number,
    temperatureLow: PropTypes.number
  }),
  dayInfo: PropTypes.number,
  handleDayInfo: PropTypes.func.isRequired
};

Daily.defaultProps = {
  daily: undefined
};
Day.defaultProps = {
  day: undefined,
  dayInfo: null
};

export default Daily;
