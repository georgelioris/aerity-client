import React from 'react';
import { Box, Header, Heading } from 'grommet';

const Nav = () => (
  <Header background="brand" alignSelf="start" justify="center">
    <Box basis="2/3" animation="fadeIn">
      <Heading size="small">Aerity</Heading>
    </Box>
  </Header>
);

export default Nav;
