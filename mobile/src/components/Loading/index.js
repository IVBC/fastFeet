import React from 'react';
import PropTypes from 'prop-types';

import { Container, Activity } from './styles';

export default function Loading({ size, background }) {
  return (
    <Container size={size} background={background}>
      <Activity />
    </Container>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  background: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
  background: null,
};
