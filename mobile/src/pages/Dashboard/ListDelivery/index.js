import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';

import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';
import api from '~/services/api';

import DeliveryCard from './ListItem';
import Loading from '~/components/Loading';

import Header from './Header';
import { FlatList } from './styles';

function List() {
  const { id } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Selection for delivery type
  const [typeDelivered, setTypeDelivered] = useState(false);
  // const { deliveredDeliveries, deliveredLoading } = useSelector(
  //   (state) => state.deliveries
  // );

  const loadDeliveries = async () => {
    if (loading) {
      return;
    }

    if (total > 0 && deliveries.length === total) {
      return;
    }

    setLoading(true);

    try {
      // console.log('loadDeliveries', typeDelivered, page);
      console.log({
        params: { page, filter: typeDelivered ? 'DELIVERED' : 'OPEN' },
      });
      const response = await api.get(`/deliverer/${id}/deliveries`, {
        params: { page, filter: typeDelivered ? 'DELIVERED' : 'OPEN' },
      });

      const {
        data: { deliveries: _deliveries, count },
      } = response;

      console.log(_deliveries);

      setDeliveries([...deliveries, ..._deliveries]);
      setTotal(count);
      setPage(page + 1);
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
    // console.log('Mudando o type: ', typeDelivered);
    if (isFocused) {
      setDeliveries([]);
      setPage(1);
      setTotal(0);
    }

    // }
  }, [typeDelivered, isFocused]);

  useEffect(() => {
    loadDeliveries();
  }, []);

  useEffect(() => {
    if (page === 1) {
      loadDeliveries();
    }
  }, [page]);

  // useEffect(() => {
  //   console.log('entrou aqui: ', isFocused);
  //   if (isFocused) {
  //     setTypeDelivered(!!typeDelivered);
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   console.log('resposta: ', deliveries.length, total);
  // }, [deliveries, total]);

  // const navigateToDetail = useCallback(
  //   (delivery) => navigate('Delivery', { delivery }),
  //   [navigate]
  // );

  // const loadMoreDeliveredDeliveries = useCallback(() => {
  //   if (deliveredLoading) {
  //     return () => {};
  //   }
  //   return dispatch(loadMoreRequest({ delivered: true }));
  // }, [deliveredLoading, dispatch]);

  // const data = useMemo(() => (delivered ? deliveredDeliveries : deliveries), [
  //   delivered,
  //   deliveredDeliveries,
  //   deliveries,
  // ]);

  // const loadMore = useMemo(
  //   () => (delivered ? loadMoreDeliveredDeliveries : loadMoreDeliveries),
  //   [delivered, loadMoreDeliveredDeliveries, loadMoreDeliveries]
  // );

  const moreLoading = useMemo(() => {
    if (loading) {
      return <Loading />;
    }
    return null;
  }, [loading]);

  // const onRefresh = useCallback(() => loadDeliveries, [loadDeliveries]);

  // const refreshing = useMemo(() => {
  //   return loading;
  // }, [loading]);

  return (
    <>
      <Header
        typeDelivered={typeDelivered}
        setTypeDelivered={setTypeDelivered}
      />
      <FlatList
        data={deliveries}
        keyExtractor={(delivery) => String(delivery.id)}
        onEndReached={loadDeliveries}
        ListFooterComponent={moreLoading}
        // refreshing={loading}
        // onRefresh={onRefresh}
        renderItem={({ item: delivery }) => (
          <DeliveryCard delivery={delivery} />
        )}
      />
    </>
  );
}

export default memo(List);
