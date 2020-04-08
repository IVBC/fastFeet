import React, { useMemo, useCallback, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
import { View, Alert } from 'react-native';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background/secondary';
import Loading from '~/components/Loading';
import PressButton from '~/components/PressButton';

import colors from '~/styles/colors';

import {
  Container,
  Icon,
  Card,
  CardTitleContainer,
  CardTitle,
  CardRow,
  CardLabel,
  CardValue,
  ButtonContent,
  CardActions,
  ActionButton,
  ButtonText,
} from './styles';

export default function Delivery() {
  const {
    params: { delivery: item },
  } = useRoute();

  const { navigate } = useNavigation();

  // const user = useSelector((state) => state.user.profile);
  const [delivery, setDelivery] = useState(item);
  const [loading, setLoading] = useState(false);

  const formatedStartedAt = useMemo(
    () =>
      delivery.start_date
        ? format(new Date(delivery.start_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [delivery.start_date]
  );

  const formatedEndedAt = useMemo(
    () =>
      delivery.end_date
        ? format(new Date(delivery.end_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [delivery.end_date]
  );

  const adress = useMemo(
    () =>
      `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipcode}`,
    [delivery.recipient]
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
      console.tron.log(err);
      console.tron.log(err.response);
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
              <CardRow>
                <View>
                  <CardLabel>DESTINATÁRIO</CardLabel>
                  <CardValue>{delivery.recipient.name}</CardValue>
                </View>
              </CardRow>
              <CardRow>
                <View>
                  <CardLabel>ENDEREÇO DE ENTREGA</CardLabel>
                  <CardValue>{adress}</CardValue>
                </View>
              </CardRow>
            </>
          )}

          <CardRow>
            <View>
              <CardLabel>PRODUTO</CardLabel>
              <CardValue>{delivery.product}</CardValue>
            </View>
          </CardRow>
        </Card>
        <Card>
          <CardTitleContainer>
            <Icon name="calendar" />
            <CardTitle>Situação da entrega</CardTitle>
          </CardTitleContainer>
          <CardRow>
            <View>
              <CardLabel>STATUS</CardLabel>
              <CardValue>{status}</CardValue>
            </View>
          </CardRow>
          <CardRow>
            <View style={{ width: '50%' }}>
              <CardLabel>DATA DE RETIRADA</CardLabel>
              <CardValue>{formatedStartedAt}</CardValue>
            </View>
            <View style={{ width: '50%', paddingLeft: 12 }}>
              <CardLabel>DATA DE ENTREGA</CardLabel>
              <CardValue>{formatedEndedAt}</CardValue>
            </View>
          </CardRow>
        </Card>
        {delivery.status !== 'DELIVERED' && (
          <CardActions>
            <CardRow>
              {delivery.status !== 'PENDING' ? (
                <>
                  <ButtonContent>
                    {loading ? (
                      <Loading />
                    ) : (
                      <ActionButton
                        onPress={() =>
                          navigate('ProblemForm', {
                            deliveryId: delivery.id,
                          })
                        }
                      >
                        <Icon name="close-circle-outline" color={colors.red} />
                        <ButtonText>Informar</ButtonText>
                        <ButtonText>Problema</ButtonText>
                      </ActionButton>
                    )}
                  </ButtonContent>
                  <ButtonContent>
                    {loading ? (
                      <Loading />
                    ) : (
                      <ActionButton
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
                      </ActionButton>
                    )}
                  </ButtonContent>
                  <ButtonContent>
                    {loading ? (
                      <Loading />
                    ) : (
                      <ActionButton
                        onPress={() =>
                          navigate('DeliverConfirm', {
                            deliveryId: delivery.id,
                          })
                        }
                      >
                        <Icon name="check-circle-outline" />
                        <ButtonText>Confirmar</ButtonText>
                        <ButtonText>Entrega</ButtonText>
                      </ActionButton>
                    )}
                  </ButtonContent>
                </>
              ) : (
                <ButtonContent>
                  {loading ? (
                    <Loading size="large" padding={22} />
                  ) : (
                    // <ActionButton onPress={handleWithdraw}>
                    //   <Icon name="page-next-outline" />
                    //   <ButtonText>Confirmar</ButtonText>
                    //   <ButtonText>Retirada</ButtonText>
                    // </ActionButton>
                    <PressButton onLongPress={handleWithdraw}>
                      <Icon name="page-next-outline" />
                      <ButtonText>Confirmar</ButtonText>
                      <ButtonText>Retirada</ButtonText>
                    </PressButton>
                  )}
                </ButtonContent>
              )}
            </CardRow>
          </CardActions>
        )}
      </Container>
    </Background>
  );
}
