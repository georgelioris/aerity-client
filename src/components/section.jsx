import { Box, Heading } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';

const Section = ({ children, title, pad, overflow }) => (
  <Box
    direction="column"
    width="large"
    pad={
      (overflow && { left: 'medium', right: 'none', vertical: 'small' }) ||
      (pad === 'none' && 'none') || { horizontal: 'medium', vertical: 'small' }
    }
    background="#f8f8fa"
    border={{
      color: '#C9CAD9',
      size: '1px',
      style: 'solid',
      side: 'top'
    }}
  >
    <Heading
      level="4"
      a11yTitle={title}
      margin={pad === 'none' ? { left: 'medium' } : { left: 'none' }}
    >
      {title}
    </Heading>
    <Box pad={overflow ? { left: 'xsmall', right: 'none' } : 'xsmall'}>
      {children}
    </Box>
  </Box>
);

export default Section;

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string.isRequired,
  pad: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  overflow: PropTypes.bool
};

Section.defaultProps = {
  children: [],
  pad: undefined,
  overflow: false
};
