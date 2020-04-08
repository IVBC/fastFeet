import React, { memo, useCallback } from 'react';
import Proptypes from 'prop-types';

import { Container, Title, Content, Button, ButtonText } from './styles';

const Header = ({ typeDelivered, setTypeDelivered }) => {
  const handleDelivered = useCallback(() => {
    setTypeDelivered(true);
  }, [setTypeDelivered]);

  const handlePending = useCallback(() => {
    setTypeDelivered(false);
  }, [setTypeDelivered]);

  return (
    <Container>
      <Title>Entregas</Title>
      <Content>
        <Button onPress={handlePending}>
          <ButtonText selected={!typeDelivered}>Pendentes</ButtonText>
        </Button>
        <Button onPress={handleDelivered}>
          <ButtonText selected={typeDelivered}>Entregues</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

Header.propTypes = {
  typeDelivered: Proptypes.bool.isRequired,
  setTypeDelivered: Proptypes.func.isRequired,
};

export default memo(Header);
