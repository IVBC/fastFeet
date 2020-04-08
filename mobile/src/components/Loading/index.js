import React from 'react';
import PropTypes from 'prop-types';

import { Container, Activity } from './styles';

export default function Loading({ size, background, padding }) {
  return (
    <Container background={background} padding={padding}>
      <Activity size={size} />
    </Container>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  background: PropTypes.string,
  padding: PropTypes.number,
};

Loading.defaultProps = {
  size: 'small',
  background: null,
  padding: null,
};
