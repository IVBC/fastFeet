import React, { memo, useCallback } from 'react';
import Proptypes from 'prop-types';

import { Container, Title, Content, Button, ButtonText } from './styles';

const Header = ({ delivered, setDelivered }) => {
  const handleDelivered = useCallback(() => {
    setDelivered(true);
  }, [setDelivered]);

  const handlePending = useCallback(() => {
    setDelivered(false);
  }, [setDelivered]);

  return (
    <Container>
      <Title>Entregas</Title>
      <Content>
        <Button onPress={handlePending}>
          <ButtonText selected={!delivered}>Pendentes</ButtonText>
        </Button>
        <Button onPress={handleDelivered}>
          <ButtonText selected={delivered}>Entregues</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

Header.propTypes = {
  delivered: Proptypes.bool.isRequired,
  setDelivered: Proptypes.func.isRequired,
};

export default memo(Header);
