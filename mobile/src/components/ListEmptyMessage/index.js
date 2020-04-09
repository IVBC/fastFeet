import React from 'react';

import PropTypes from 'prop-types';

import { Container, Icon, Text } from './styles';

export default function ListEmptyMessage({ iconName, message }) {
  return (
    <Container>
      <Icon name={iconName} />
      <Text>{message}</Text>
    </Container>
  );
}

ListEmptyMessage.propTypes = {
  iconName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
