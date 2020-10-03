import { Box, Image } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import ButtonForm from '../components/buttonform';
import AerityLogo from '../assets/logo.png';

const Landing = ({ getCoords, fetchCoords }) => (
  <Box
    id="landing"
    align="center"
    width="large"
    gap="20vh"
    pad={{ top: 'xlarge' }}
  >
    <Box width="192px" height="192px">
      <Image fit="contain" src={AerityLogo} alt="Aerity" />
    </Box>
    <ButtonForm getCoords={getCoords} fetchCoords={fetchCoords} />
  </Box>
);

export default Landing;

Landing.propTypes = {
  getCoords: PropTypes.func.isRequired,
  fetchCoords: PropTypes.func.isRequired
};
