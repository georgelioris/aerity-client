import React, { useState } from 'react';
import { Box, Layer } from 'grommet';
import { Search, LinkPrevious } from 'grommet-icons';
import PropTypes from 'prop-types';
import ButtonForm from './buttonform';
import { useHideOnScroll } from '../lib/hooks';

const Sticky = ({ getCoords, fetchCoords, location }) => {
  const [show, setShow] = useState(false);
  const hidden = useHideOnScroll();
  return (
    <>
      {!hidden && !show && (
        <Layer
          position="bottom-right"
          modal={false}
          margin={{ vertical: 'small', horizontal: '10px' }}
          className="sticky"
          responsive={false}
          plain
          animation="slide"
        >
          <Box
            justify="center"
            align="center"
            className="circle-button"
            background="accent-3"
            elevation="medium"
            onClick={() => setShow(!show)}
          >
            <Search color="dark-6" label="show" />
          </Box>
        </Layer>
      )}
      {show && (
        <Layer
          position="center"
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          animation="fadeIn"
        >
          <Box justify="center" align="center" width="large" height="100vh">
            <Box direction="column" gap="medium">
              <ButtonForm
                getCoords={getCoords}
                fetchCoords={fetchCoords}
                location={location}
                onSub={() => setShow(false)}
              />

              <Box
                alignSelf="end"
                justify="center"
                align="center"
                round
                className="circle-button"
                onClick={() => setShow(!show)}
              >
                <LinkPrevious color="accent-3" label="back" />
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default Sticky;

Sticky.propTypes = {
  getCoords: PropTypes.func.isRequired,
  fetchCoords: PropTypes.func.isRequired,
  location: PropTypes.string
};

Sticky.defaultProps = {
  location: undefined
};
