import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper, Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
