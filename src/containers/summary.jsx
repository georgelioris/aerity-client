import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import Currently from '../components/currently';
import Daily from '../components/daily';
import Details from '../components/details';
import Hourly from '../components/hourly';
import Precipitation from '../components/precipitation';
import Wind from '../components/wind';
import { parseDate } from '../lib/helpers';

const Summary = ({ wData }) => {
  const { currently, timezone, location, flags, daily } = wData;
  const today = daily.data[0];
  const { summary } = today;
  const hours = wData.hourly.data.slice(0, 25);
  const formatDate = (
    seconds,
    opts = {
      hour: 'numeric',
      timeZone: 'UTC'
    }
  ) => parseDate(seconds + Number(timezone), opts);

  return (
    <>
      <div id="portrait">
        <div id="currently-container">
          <Currently
            currently={{ ...currently, timezone, ...flags, today, location }}
          />
          <Box align="center" margin={{ top: '10%' }}>
            <Text color="#F8F8FA">{summary}</Text>
          </Box>
        </div>
        <Hourly hours={hours} units={flags.units} formatDate={formatDate} />
      </div>
      <Details details={currently} units={flags.units} />
      <Precipitation
        hours={hours}
        units={flags.units}
        formatDate={formatDate}
      />
      <Wind
        hours={hours}
        currentWindSpeed={currently.windSpeed}
        currentWindBearing={currently.windBearing}
        units={flags.units}
        formatDate={formatDate}
      />
      <Daily daily={daily} units={flags.units} formatDate={formatDate} />
    </>
  );
};

export default Summary;

Summary.propTypes = {
  wData: PropTypes.shape({
    timezone: PropTypes.number,
    location: PropTypes.string,
    currently: PropTypes.oneOfType([PropTypes.object]),
    hourly: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object)
    }),
    daily: PropTypes.oneOfType([PropTypes.object]),
    flags: PropTypes.oneOfType([PropTypes.object])
  })
};
Summary.defaultProps = {
  wData: null
};
