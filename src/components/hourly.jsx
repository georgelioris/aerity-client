import { Box, calcs, Chart } from 'grommet';
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { toKelvin } from '../lib/helpers';
import { useNodeSize } from '../lib/hooks';
import WeatherIcon from './weatherIcon';

const labelDate = (seconds) =>
  new Intl.DateTimeFormat('en', {
    hour: 'numeric'
  }).format(new Date(0).setUTCSeconds(seconds));

const labelTemp = (temp) => `${Math.round(temp)}${String.fromCharCode(176)}`;
const absoluteDistance = (convertFn = (a) => a) => (minVal, maxVal) => (val) =>
  Math.round(144 - ((convertFn(val) - minVal) * 144) / (maxVal - minVal));

const GraphContainer = ({ children }) => {
  return (
    <div className="overflow-container" id="hourly">
      <div style={{ maxWidth: '48em' }}>
        <div style={{ minWidth: '100rem' }}>{children}</div>
      </div>
    </div>
  );
};

const GraphRow = forwardRef(({ top, children }, ref) => (
  <Box
    ref={ref}
    direction="row"
    flex
    alignContent="between"
    justify="between"
    pad={{ horizontal: '2.1875rem' }}
    style={
      top
        ? {
            textShadow: '1px 1px 1px #2e294e'
          }
        : { marginTop: '-4rem' }
    }
  >
    {children}
  </Box>
));

const TemperatureRow = ({ hours, labelDistance, setMarginTop }) => {
  const [rowRef, rowSize] = useNodeSize();

  useEffect(() => {
    const rowHeight = rowSize.height;
    setMarginTop(`-${rowHeight !== 20 ? rowHeight + 5 : 5}px`);
  });

  return (
    <GraphRow top ref={rowRef}>
      {hours.map(({ time, temperature }) => (
        <Box
          align="center"
          key={time}
          width="48px"
          height="20px"
          style={{
            zIndex: 1,
            fontWeight: 500
          }}
          margin={{ top: `${labelDistance(Math.round(temperature))}px` }}
        >
          {labelTemp(temperature)}
        </Box>
      ))}
    </GraphRow>
  );
};

const IconTimeRow = ({ hours }) => (
  <GraphRow>
    {hours.map(({ time, icon }) => (
      <Box direction="column" align="center" key={time} width="48px">
        <Box style={{ width: '32px', height: '32px', zIndex: 1 }}>
          <WeatherIcon icon={icon} animate={false} size={32} />
        </Box>
        <div
          style={{
            marginTop: '0.8rem',
            minWidth: '32px',
            textShadow: '1px 1px 2px #2E294E',
            color: '#F8F8FA',
            zIndex: 1,
            fontWeight: 500
          }}
        >
          {labelDate(time)}
        </div>
      </Box>
    ))}
  </GraphRow>
);

const Graph = ({ hours, absoluteTemp, marginTop, min, max }) => {
  const values = hours.map(({ temperature }, _) => ({
    value: [_, absoluteTemp(Math.round(temperature))],
    label: `${temperature}`
  }));
  const { bounds } = useMemo(
    () => calcs(values, { coarseness: 5, min, max, steps: [1, 1] }),
    [values, min, max]
  );
  return (
    <Chart
      size={{ width: 'full' }}
      type="area"
      id="hourlychart"
      aria-label="chart"
      overflow
      animate
      thickness="none"
      bounds={bounds}
      margin={{ top: marginTop }}
      color={[
        { value: min + 5, color: '#2e294e' },
        { value: max, color: '#877ebb' }
      ]}
      values={values}
      opacity="medium"
      pad={{ horizontal: 'none', vertical: 'medium' }}
      style={{
        zIndex: '0',
        overflowX: 'auto'
      }}
    />
  );
};

const Hourly = ({ hours, units }) => {
  const labeledhours = hours.slice(1, 24);
  const maxTemp = toKelvin(units)(
    Math.round(
      hours.reduce(
        (acc, { temperature }) => (temperature > acc ? temperature : acc),
        0
      )
    )
  );
  const minTemp = toKelvin(units)(
    Math.round(
      hours.reduce(
        (acc, { temperature }) =>
          !acc || temperature < acc ? temperature : acc,
        0
      )
    ) - 5
  );
  const [marginTop, setMarginTop] = useState('0');
  return (
    <GraphContainer>
      <TemperatureRow
        hours={labeledhours}
        labelDistance={absoluteDistance(toKelvin(units))(minTemp, maxTemp)}
        setMarginTop={setMarginTop}
      />
      <Graph
        hours={hours}
        absoluteTemp={toKelvin(units)}
        marginTop={marginTop}
        max={maxTemp}
        min={minTemp}
      />
      <IconTimeRow hours={labeledhours} />
    </GraphContainer>
  );
};

GraphContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

GraphContainer.defaultProps = {
  children: []
};

GraphRow.propTypes = {
  top: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

GraphRow.defaultProps = {
  top: null,
  children: []
};

TemperatureRow.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.object).isRequired,
  labelDistance: PropTypes.func.isRequired,
  setMarginTop: PropTypes.func.isRequired
};

IconTimeRow.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.object).isRequired
};

Hourly.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.object).isRequired,
  units: PropTypes.string.isRequired
};

Graph.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.object).isRequired,
  absoluteTemp: PropTypes.func.isRequired,
  marginTop: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};
export default Hourly;
