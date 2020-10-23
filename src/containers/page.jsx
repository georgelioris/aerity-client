import { Box, Grommet } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/footer';
import Notification from '../components/notification';
import Spinner from '../components/spinner';
import Sticky from '../components/sticky';
import grommet from '../lib/grommet.json';
import Landing from './landing';
import Summary from './summary';

const Page = ({
  state: { isLoading, isError, wData, getCoords, fetchCoords }
}) => (
  <Grommet theme={grommet} plain>
    <Box
      style={{ minHeight: '95vh' }}
      width="100%"
      pad="none"
      id="main-container"
    >
      <Box
        id="round"
        animation="fadeIn"
        align="center"
        pad="none"
        alignSelf="center"
        background={!wData ? '#877ebb' : 'white'}
        elevation="large"
      >
        <Notification error={isError} />
        {wData && !isLoading && (
          <Sticky
            getCoords={() => getCoords({ clearCache: true, useGPS: true })}
            fetchCoords={fetchCoords}
            location={wData.location}
          />
        )}
        {wData && !isLoading && <Summary wData={wData} />}
        {isLoading && <Spinner />}
        {!wData && !isLoading && (
          <Landing
            getCoords={() => getCoords({ clearCache: true, useGPS: true })}
            fetchCoords={fetchCoords}
          />
        )}
        <Footer />
      </Box>
    </Box>
  </Grommet>
);

Page.propTypes = {
  state: PropTypes.shape({
    isLoading: PropTypes.bool,
    isError: PropTypes.shape({
      status: PropTypes.bool,
      message: PropTypes.string
    }),
    wData: PropTypes.oneOfType([PropTypes.object]),
    getCoords: PropTypes.func,
    fetchCoords: PropTypes.func
  })
};
Page.defaultProps = {
  state: undefined
};

export default Page;
