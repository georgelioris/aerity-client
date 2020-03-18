import React from 'react';
import { Box, Header, Heading } from 'grommet';

const Nav = () => (
  <Header
    background="brand"
    width="xlarge"
    justify="start"
    margin={{ left: 'large' }}
    alignSelf="center"
  >
    <Box justify="start" animation="fadeIn">
      <Heading size="small">Aerity</Heading>
    </Box>
  </Header>
);

export default Nav;
