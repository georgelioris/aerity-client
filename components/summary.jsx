import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import ReactAnimatedWeather from 'react-animated-weather';
import { formatIcon, parseDate, parseTemp } from '../lib/helpers';

const Summary = ({ wData }) => {
  const { currently, timezone, flags } = wData;
  return (
    <>
      <Box
        width="large"
        direction="row"
        justify="between"
        alignContent="between"
      >
        <Box direction="column">
          <Heading level="4" color="accent-2" margin="none">
            {timezone}
          </Heading>
          <Heading level="3" margin="none">
            {parseDate(currently.time)}
          </Heading>
        </Box>
        <Box direction="column">
          <Heading level="4" margin="none" color="accent-2">
            Currently
          </Heading>
          <Heading level="3" margin="none">
            {parseTemp(currently.temperature, flags.units)}
          </Heading>
          {Math.floor(currently.temperature) !==
            Math.floor(currently.apparentTemperature) && (
            <span>
              {`Feels like 
								${Math.floor(currently.apparentTemperature)}°`}
            </span>
          )}
        </Box>
      </Box>
      <Box direction="column" align="center">
        <Box style={{ width: 'auto' }}>
          <ReactAnimatedWeather
            icon={formatIcon(currently.icon)}
            color="#FFEAD0"
            animate
            size={96}
          />
        </Box>
        <Heading level="4">{wData.currently.summary}</Heading>
      </Box>
    </>
  );
};

Summary.propTypes = {
  wData: PropTypes.shape({
    timezone: PropTypes.string,
    currently: PropTypes.object,
    hourly: PropTypes.shape({
      summary: PropTypes.string,
      icon: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.object)
    }),
    daily: PropTypes.shape({
      summary: PropTypes.string,
      icon: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.object)
    }),
    flags: PropTypes.shape({
      units: PropTypes.string
    })
  })
};
Summary.defaultProps = {
  wData: undefined
};

export default Summary;
