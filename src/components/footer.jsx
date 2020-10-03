import { Anchor, Footer, Image, ResponsiveContext } from 'grommet';
import { Github } from 'grommet-icons';
import React, { useContext } from 'react';
import DarkSkyLogo from '../assets/poweredby.png';

const FooterSection = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Footer
      style={{ gridArea: 'foot' }}
      justify="between"
      align="center"
      width="100%"
      wrap
    >
      <Anchor
        a11yTitle="Powered by Dark Sky"
        alignSelf="center"
        margin={{ left: 'medium', vertical: 'small' }}
        width="30%"
        rel="noopener"
        target="_blank"
        href="https://darksky.net/poweredby/"
      >
        <Image
          fit="contain"
          height={size === 'medium' ? '30px' : '22px'}
          width={size === 'medium' ? '87px' : '64px'}
          src={DarkSkyLogo}
        />
      </Anchor>

      <Anchor
        a11yTitle="View project on Github"
        alignSelf="center"
        color="dark-6"
        size="xsmall"
        height="30px"
        icon={<Github size={size === 'medium' ? '30px' : '22px'} />}
        rel="noopener"
        target="_blank"
        href="https://github.com/georgelioris/aerity-client"
      />
      <Anchor
        a11yTitle="Powered Open Weather"
        alignSelf="center"
        margin={{ right: 'medium', vertical: 'small' }}
        color="dark-6"
        width="30%"
        size="xsmall"
        rel="noopener"
        target="_blank"
        href="https://openweathermap.org/"
        label="OpenWeather"
      />
    </Footer>
  );
};
export default FooterSection;
