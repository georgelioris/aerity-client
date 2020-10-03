import React, { useMemo } from 'react';
import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import Section from './section';
import { numberWithCommas, isSI, parseUvIndex } from '../lib/helpers';

const labelTemp = (temp) => `${Math.round(temp)}${String.fromCharCode(176)}`;

const Details = ({
  details: { humidity, dewPoint, pressure, uvIndex, visibility },
  units
}) => {
  const entries = useMemo(
    () => [
      ['Humidity', `${Math.round(humidity * 100)}%`],
      ['Dew point', `${labelTemp(dewPoint)}${isSI(units) ? 'C' : 'F'} `],
      [
        'Visibility',
        `${Math.round(visibility)} ${
          units === 'si' || units === 'ca' ? 'km' : 'mi'
        } `
      ],
      ['UV Index', parseUvIndex(uvIndex)],
      ['Pressure', `${numberWithCommas(Math.round(pressure))} mBar`]
    ],
    [humidity, dewPoint, units, uvIndex, pressure, visibility]
  );
  return (
    <Section title="Current Details">
      <Box direction="row" gap="xlarge" wrap>
        <Box
          direction="column"
          alignSelf="start"
          margin={{ bottom: 'xsmall' }}
          gap="0.15rem"
        >
          {entries.map((entry) => (
            <Text size="1rem" color="dark-5" key={entry[0]}>
              {entry[0]}
            </Text>
          ))}
        </Box>
        <Box direction="column" alignSelf="start" gap="0.15rem">
          {entries.map((entry) => (
            <Text size="1rem" key={entry[0]}>
              {entry[1]}
            </Text>
          ))}
        </Box>
      </Box>
    </Section>
  );
};

export default Details;

Details.propTypes = {
  details: PropTypes.shape({
    humidity: PropTypes.number,
    dewPoint: PropTypes.number,
    pressure: PropTypes.number,
    uvIndex: PropTypes.number,
    visibility: PropTypes.number
  }),
  units: PropTypes.string
};

Details.defaultProps = {
  details: undefined,
  units: undefined
};
