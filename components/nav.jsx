import React from 'react';
import { Box, Header, Heading } from 'grommet';
import Link from 'next/link';

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => ({ ...link, key: `nav-link-${link.href}-${link.label}` }));

const Nav = () => (
  <Header background="brand" alignSelf="start" justify="center">
    <Box basis="2/3" animation="fadeIn">
      <Heading size="small">Aerity</Heading>
    </Box>
  </Header>
);

export default Nav;
