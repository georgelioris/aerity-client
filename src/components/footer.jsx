import { Anchor, Footer } from 'grommet';
import React from 'react';

const FooterSection = () => (
  <Footer justify="center" alignContent="center" height="5vh" pad="small">
    <Anchor
      alignSelf="start"
      color="dark-3"
      size="xsmall"
      href="https://darksky.net/poweredby/"
      label="Powered by Dark Sky"
    />
    <Anchor
      alignSelf="start"
      color="dark-3"
      size="xsmall"
      href="https://openweathermap.org/"
      label="OpenWeatherMap"
    />
    <Anchor
      alignSelf="start"
      color="accent-4"
      size="xsmall"
      href="https://github.com/georgelioris/aerity-client"
      label="View on github"
    />
  </Footer>
);
export default FooterSection;
