import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';

import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';
import api from '~/services/api';

import ListItem from './ListItem';
import Loading from '~/components/Loading';
import EmptyListMessage from '~/components/ListEmptyMessage';

import Header from './Header';
import { List } from './styles';

function ListDelivery() {
  const { id } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Selection for delivery type
  const [typeDelivered, setTypeDelivered] = useState(false);

  const loadDeliveries = async () => {
    if (loading) {
      return;
    }

    if (total > 0 && deliveries.length === total) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`/deliverer/${id}/deliveries`, {
        params: { page, filter: typeDelivered ? 'DELIVERED' : 'OPEN' },
      });

      const {
        data: { deliveries: _deliveries, count },
      } = response;

      setDeliveries((prevDeliveries) => [...prevDeliveries, ..._deliveries]);

      setTotal(count);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      Alert.alert(
        'Não foi possível carregar suas entregas !',
        'Falha na comuniçao com o servidor. Por favor, tente novamente...'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setDeliveries([]);
      setPage(1);
      setTotal(0);
    }
  }, [typeDelivered, isFocused]);

  useEffect(() => {
    if (page === 1) {
      loadDeliveries();
    }
  }, [page]);

  const moreLoading = useMemo(() => {
    if (loading) {
      return <Loading />;
    }
    return null;
  }, [loading]);

  const renderEmpty = useCallback(() => {
    if (!loading) {
      let contentEmptyListMessage;

      if (typeDelivered) {
        contentEmptyListMessage = {
          iconName: 'truck-check',
          message: 'Não há registros de entregas.',
        };
      } else {
        contentEmptyListMessage = {
          iconName: 'truck-delivery',
          message: 'Não há entregas pendentes.',
        };
      }

      return (
        <EmptyListMessage
          iconName={contentEmptyListMessage.iconName}
          message={contentEmptyListMessage.message}
        />
      );
    }
    return null;
  }, [loading, typeDelivered]);

  return (
    <>
      <Header
        typeDelivered={typeDelivered}
        setTypeDelivered={setTypeDelivered}
      />
      <List
        data={deliveries}
        keyExtractor={(delivery) => String(delivery.id)}
        onEndReached={loadDeliveries}
        ListFooterComponent={moreLoading}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item: delivery }) => <ListItem delivery={delivery} />}
      />
    </>
  );
}

export default memo(ListDelivery);
