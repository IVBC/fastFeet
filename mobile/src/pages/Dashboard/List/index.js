import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';
import PropTypes, { func } from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import api from '~/services/api';

import DeliveryCard from './ListItem';
import Loading from '~/components/Loading';

import Header from './Header';
import { FlatList } from './styles';

function List() {
  const { navigate } = useNavigation();
  console.log('LIST');

  const { id } = useSelector((state) => state.auth);

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Selection for delivery type
  const [delivered, setDelivered] = useState(false);
  // const { deliveredDeliveries, deliveredLoading } = useSelector(
  //   (state) => state.deliveries
  // );
  const loadDeliveries = useCallback(async () => {
    if (loading) {
      return;
    }

    if (total > 0 && deliveries.length === total) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`/deliverer/${id}/deliveries`, {
        params: { page },
      });
      console.tron.log(response);
      const {
        data: { deliveries: _deliveries, count },
      } = response;
      console.log('response ', _deliveries);

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
  }, []);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  useEffect(() => {
    console.log('resposta: ', deliveries.length, total);
  }, [deliveries, total]);

  // const navigateToDetail = useCallback(
  //   (delivery) => navigate('Delivery', { delivery }),
  //   [navigate]
  // );

  // const renderItem = ({ delivery }) => (
  //   <DeliveryCard
  //     delivery={delivery}
  //     navigateToDetail={() => navigateToDetail(delivery)}
  //   />
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

  // const moreLoading = useMemo(() => {
  //   if (loading) {
  //     return <Loading />;
  //   }
  //   return null;
  // }, [loading]);

  // const onRefresh = useCallback(() => loadDeliveries, [loadDeliveries]);

  // const refreshing = useMemo(() => {
  //   return loading;
  // }, [loading]);

  return (
    <>
      <Header delivered={delivered} setDelivered={setDelivered} />
      {/* <FlatList
        data={deliveries}
        renderItem={renderItem}
        keyExtractor={(delivery) => String(delivery || 2)}
        onEndReached={loadDeliveries}
        // ListFooterComponent={moreLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
      /> */}
    </>
  );
}

export default memo(List);
