import { Box, Grommet, Main } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/footer';
import Nav from '../components/nav';
import Spinner from '../components/spinner';
import Summary from '../components/summary';
import MyTheme from '../lib/MyTheme.json';

const Page = ({ state }) => (
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
          {state.isError.status && <p>{state.isError.message}</p>}
          {state.wData && <Summary wData={state.wData} />}
          {state.isLoading && <Spinner />}
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
    wData: PropTypes.object
  })
};
Page.defaultProps = {
  state: undefined
};

export default Page;
