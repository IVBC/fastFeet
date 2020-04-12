import React, { useMemo, useCallback, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import { View, Alert } from 'react-native';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';
import Loading from '~/components/Loading';
import PressButton from '~/components/PressButton';

import colors from '~/styles/colors';

import {
  Container,
  Icon,
  Card,
  CardTitleContainer,
  CardTitle,
  Row,
  CardDate,
  Label,
  TextInfo,
  ButtonContent,
  CardOptions,
  OptionButton,
  ButtonText,
} from './styles';

export default function DeliveryDetail() {
  const {
    params: { delivery: item },
  } = useRoute();

  const { navigate } = useNavigation();

  const [delivery, setDelivery] = useState(item);
  const [loading, setLoading] = useState(false);

  const completeAddress = useMemo(
    () =>
      `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipcode}`,
    [delivery.recipient]
  );

  const formatedStartDate = useMemo(
    () =>
      delivery.start_date
        ? format(new Date(delivery.start_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [delivery.start_date]
  );

  const formatedEndDate = useMemo(
    () =>
      delivery.end_date
        ? format(new Date(delivery.end_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [delivery.end_date]
  );

  const status = useMemo(() => {
    switch (delivery.status) {
      case 'PENDING':
        return 'Pendente';
      case 'CANCELED':
        return 'Cancelado';
      case 'WITHDRAWN':
        return 'Retirado';
      case 'DELIVERED':
        return 'Entregue';
      default:
        return 'Error';
    }
  }, [delivery.status]);

  const handleWithdraw = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.put(`/delivery/${delivery.id}/withdraw`);
      setDelivery(response.data);
    } catch (err) {
      if (
        err.response.data.error ===
        'You can only pick up deliveries today between 8:00h and 18:00h'
      ) {
        Alert.alert(
          'Fora do horário de serviço!',
          'Você só pode retirar as entregas hoje entre 8:00h e 18: 00h.'
        );
      } else if (
        err.response.data.error ===
        'You have already reached the limit of 5 withdrawals per day'
      ) {
        Alert.alert(
          'Produto não retirado!',
          'Você já atingiu o limite de 5 retiradas por dia'
        );
      } else {
        Alert.alert('Não foi possível confirmar a retirada');
      }
    } finally {
      setLoading(false);
    }
  }, [delivery.id]);

  return (
    <Background>
      <Container>
        <Card>
          <CardTitleContainer>
            <Icon name="truck" />
            <CardTitle>Informações da entrega</CardTitle>
          </CardTitleContainer>
          {delivery.recipient && (
            <>
              <Row marginTop={0}>
                <View>
                  <Label>DESTINATÁRIO</Label>
                  <TextInfo>{delivery.recipient.name}</TextInfo>
                </View>
              </Row>
              <Row>
                <View>
                  <Label>ENDEREÇO DE ENTREGA</Label>
                  <TextInfo>{completeAddress}</TextInfo>
                </View>
              </Row>
            </>
          )}

          <Row>
            <View>
              <Label>PRODUTO</Label>
              <TextInfo>{delivery.product}</TextInfo>
            </View>
          </Row>
        </Card>
        <Card>
          <CardTitleContainer>
            <Icon name="calendar" />
            <CardTitle>Situação da entrega</CardTitle>
          </CardTitleContainer>
          <Row marginTop={0}>
            <View>
              <Label>STATUS</Label>
              <TextInfo>{status}</TextInfo>
            </View>
          </Row>
          <Row>
            <CardDate>
              <Label>DATA DE RETIRADA</Label>
              <TextInfo>{formatedStartDate}</TextInfo>
            </CardDate>
            <CardDate>
              <Label>DATA DE ENTREGA</Label>
              <TextInfo>{formatedEndDate}</TextInfo>
            </CardDate>
          </Row>
        </Card>
        {delivery.status !== 'DELIVERED' && (
          <CardOptions>
            <Row>
              {delivery.status !== 'PENDING' ? (
                <>
                  <ButtonContent>
                    {loading ? (
                      <Loading />
                    ) : (
                      <OptionButton
                        onPress={() =>
                          navigate('ProblemForm', {
                            deliveryId: delivery.id,
                          })
                        }
                      >
                        <Icon name="close-circle-outline" color={colors.red} />
                        <ButtonText>Informar</ButtonText>
                        <ButtonText>Problema</ButtonText>
                      </OptionButton>
                    )}
                  </ButtonContent>
                  <ButtonContent>
                    {loading ? (
                      <Loading />
                    ) : (
                      <OptionButton
                        onPress={() =>
                          navigate('ProblemsList', {
                            deliveryId: delivery.id,
                          })
                        }
                      >
                        <Icon
                          name="information-outline"
                          color={colors.yellow}
                        />
                        <ButtonText>Visualizar</ButtonText>
                        <ButtonText>Problemas</ButtonText>
                      </OptionButton>
                    )}
                  </ButtonContent>
                  <ButtonContent>
                    {loading ? (
                      <Loading />
                    ) : (
                      <OptionButton
                        onPress={() =>
                          navigate('DeliverConfirm', {
                            deliveryId: delivery.id,
                          })
                        }
                      >
                        <Icon name="check-circle-outline" />
                        <ButtonText>Confirmar</ButtonText>
                        <ButtonText>Entrega</ButtonText>
                      </OptionButton>
                    )}
                  </ButtonContent>
                </>
              ) : (
                <ButtonContent>
                  {loading ? (
                    <Loading size="large" padding={22} />
                  ) : (
                    <PressButton onLongPress={handleWithdraw}>
                      <Icon name="page-next-outline" />
                      <ButtonText>Confirmar</ButtonText>
                      <ButtonText>Retirada</ButtonText>
                    </PressButton>
                  )}
                </ButtonContent>
              )}
            </Row>
          </CardOptions>
        )}
      </Container>
    </Background>
  );
}
