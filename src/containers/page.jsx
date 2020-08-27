import { Box, Grommet, Main, Button } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/footer';
import Nav from '../components/nav';
import Spinner from '../components/spinner';
import Summary from '../components/summary';
import MyTheme from '../lib/MyTheme.json';

const Page = ({ state: { isLoading, isError, wData, getCoords } }) => (
  <Grommet theme={MyTheme}>
    <Box style={{ minHeight: '95vh' }} pad={{ botton: 'small' }} width="100%">
      <Nav />
      <Main pad={{ bottom: 'xlarge' }} animation="fadeIn">
        <Box
          align="center"
          style={{
            color: 'white'
          }}
          pad="medium"
          alignSelf="center"
        >
          {isError.status && !isLoading && <p>{isError.message}</p>}
          {wData && !isLoading && <Summary wData={wData} />}
          {isLoading && <Spinner />}

          {!isLoading && (
            <Button
              primary
              margin={{ top: 'large' }}
              color="accent-1"
              label="Use my location"
              onClick={getCoords}
            />
          )}
        </Box>
      </Main>
    </Box>
    <Footer />
    <style>
      {`
          body {
            margin: 0 auto;
            background: #2e294e;
            overflow-x: hidden;
            user-select: none;
          }
        `}
    </style>
  </Grommet>
);

Page.propTypes = {
  state: PropTypes.shape({
    isLoading: PropTypes.bool,
    isError: PropTypes.shape({
      status: PropTypes.bool,
      message: PropTypes.string
    }),
    wData: PropTypes.object,
    getCoords: PropTypes.func
  })
};
Page.defaultProps = {
  state: undefined
};

export default Page;
