import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Background as StyledBackground,
  Content,
  StatusBar,
} from './styles';

export default function Background({ children }) {
  return (
    <Container>
      <StatusBar />
      <StyledBackground />
      <Content>{children}</Content>
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.element.isRequired,
};
