import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

function DefaultAvatar({ name, size }) {
  const Initials = name.split(' ');
  const colors = [
    {
      color: '#A28FD0',
      background: '#F4EFFC',
    },
    {
      color: '#CB946C',
      background: '#FCF4EE',
    },
    {
      color: '#83CEC9',
      background: '#EBFBFA',
    },
    {
      color: '#CC7584',
      background: '#FFEEF1',
    },
    {
      color: '#A8D080',
      background: '#F4F9EF',
    },
    {
      color: '#CCCC8B',
      background: '#FCFCEF',
    },
  ];

  const randomColor = Math.floor(Math.random() * 6);

  return (
    <Container
      color={colors[randomColor].color}
      background={colors[randomColor].background}
      size={size}
    >
      <Text size={size}>
        {Initials[1] ? `${Initials[0][0]}${Initials[1][0]}` : Initials[0][0]}
      </Text>
    </Container>
  );
}

export default memo(DefaultAvatar);

DefaultAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
