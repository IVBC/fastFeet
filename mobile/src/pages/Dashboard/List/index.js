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
  
      useEffect(() => {
        async function loadDeliveries() {
            try {
                // Setting the loading to true before the start of the request
                setLoading(true);
                const response = await api.get(`/deliverer/${id}/deliveries`, {
                    params: { page },
                });
                const {
                    data: { deliveries: newDeliveries },
                } = response;

                setDeliveries([...deliveries, ...newDeliveries]);
            } catch (e) {
                console.tron.log(e);
            } finally {
                // Setting the loading to true after an successfully response or a error
                setLoading(false);
            }
        }

        loadDeliveries();
        // eslint-disable-next-line
    }, []);

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
