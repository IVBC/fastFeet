import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Progress from '~/components/ProgressSteps';

import {
  Container,
  Content,
  TitleContainer,
  TitleIcon,
  TitleText,
  Footer,
  FooterContent,
  FooterContentData,
  FooterLabel,
  FooterInfo,
  FooterButton,
  FooterButtonTitle,
} from './styles';

const DeliveryCard = ({ delivery, navigateToDetail }) => {
  console.log(delivery);
  return (
    <Container>
      <Content>
        <TitleContainer>
          <TitleIcon />
          <TitleText>Entrega {delivery.id}</TitleText>
        </TitleContainer>
        <Progress status={delivery.status} />
      </Content>
      <Footer>
        <FooterContentData>
          <FooterLabel>Data</FooterLabel>
          <FooterInfo>{delivery.createdAt}</FooterInfo>
        </FooterContentData>
        <FooterContent style={{ flexWrap: 'nowrap' }}>
          <FooterLabel>Cidade</FooterLabel>
          <FooterInfo>{delivery.Recipient.city}</FooterInfo>
        </FooterContent>
        <FooterButton onPress={navigateToDetail}>
          <FooterContent style={{ flexShrink: 1 }}>
            <FooterButtonTitle>Ver detalhes</FooterButtonTitle>
          </FooterContent>
        </FooterButton>
      </Footer>
    </Container>
  );
};

DeliveryCard.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    status: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    Recipient: PropTypes.shape({ city: PropTypes.string }),
  }).isRequired,

  navigateToDetail: PropTypes.func.isRequired,
};

export default memo(DeliveryCard);
