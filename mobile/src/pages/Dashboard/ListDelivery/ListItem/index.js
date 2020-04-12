import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

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

const ListItem = ({ delivery }) => {
  const { navigate } = useNavigation();

  const navigateToDetail = useCallback(
    () => navigate('Delivery', { delivery }),
    [navigate, delivery]
  );

  const formattedDate = useMemo(() => {
    return format(parseISO(delivery.created_at), 'MM/dd/yyyy');
  }, [delivery.created_at]);

  return (
    <Container>
      <Content>
        <TitleContainer>
          <TitleIcon />
          <TitleText>
            Entrega {delivery.id < 10 ? `0${delivery.id}` : delivery.id}
          </TitleText>
        </TitleContainer>
        <Progress status={delivery.status} />
      </Content>
      <Footer>
        <FooterContentData>
          <FooterLabel>Data</FooterLabel>
          <FooterInfo>{formattedDate}</FooterInfo>
        </FooterContentData>
        <FooterContent>
          <FooterLabel>Cidade</FooterLabel>
          <FooterInfo>{delivery.recipient.city}</FooterInfo>
        </FooterContent>
        <FooterButton onPress={navigateToDetail}>
          <FooterContent>
            <FooterButtonTitle>Ver detalhes</FooterButtonTitle>
          </FooterContent>
        </FooterButton>
      </Footer>
    </Container>
  );
};

ListItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    recipient: PropTypes.shape({ city: PropTypes.string }),
    status: PropTypes.string,
  }).isRequired,
};

export default memo(ListItem);
