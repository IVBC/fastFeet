import React from 'react';

import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function ListEmptyMessage({ icon, message }) {
  return (
    <Container>
      {icon()}
      <Text>{message}</Text>
    </Container>
  );
}

ListEmptyMessage.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
