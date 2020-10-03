import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Layer, Text } from 'grommet';
import { StatusCritical } from 'grommet-icons';

const Notification = ({ error: { status, message } }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status && message) setOpen(true);
    return () => {
      setTimeout(() => setOpen(false), 3500);
    };
  }, [status, message]);

  return open && message ? (
    <Layer
      position="bottom"
      modal={false}
      margin={{ vertical: 'xlarge', horizontal: 'small' }}
      onEsc={() => setOpen(false)}
      responsive={false}
      plain
    >
      <Box
        align="center"
        direction="row"
        gap="small"
        justify="between"
        round="medium"
        elevation="medium"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background="accent-1"
      >
        <Box align="center" direction="row" gap="xsmall">
          <StatusCritical color="dark-6" />
          <Text>{message}</Text>
        </Box>
      </Box>
    </Layer>
  ) : null;
};

export default Notification;

Notification.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.bool,
    message: PropTypes.string
  })
};

Notification.defaultProps = {
  error: PropTypes.shape({ status: false, message: '' })
};
