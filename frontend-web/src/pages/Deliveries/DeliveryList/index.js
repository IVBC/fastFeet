import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/MenuButton';
import SearchField from '~/components/Form/SearchField';

import {
  Container,
  InitialContent,
  DeliveryListTable,
  TableHead,
} from './styles';

import DeliveryItem from './DeliveryItemTable';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');
      const { data } = response;
      setLoading(false);
      setDeliveries(data);
    }
    setLoading(true);
    loadDeliveries();
  }, []);

  async function fetchMoreData() {
    if (loading) return;

    if (deliveries.length >= 12) {
      setHasMore(false);
      return;
    }

    setLoading(true);

    const response = await api.get('/deliveries', {
      params: {
        page,
      },
    });
    const { data } = response;

    setDeliveries([...deliveries, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  async function updateDeliveries() {
    const response = await api.get('deliveries');
    const { data } = response;

    setDeliveries(data);
  }

  async function onChange(event) {
    const response = await api.get(`deliveries?q=${event.target.value}`);
    const { data } = response;
    setDeliveries(data);
  }

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando encomendas</strong>
        <aside>
          <SearchField onChange={onChange} placeholder="encomendas" />
          <AddButton onClick={() => history.push('/deliveries/new')} />
        </aside>
      </InitialContent>
      <div>
        <InfiniteScroll
          dataLength={deliveries.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            // <div style={{}}>
            //   <ReactLoading type="balls" color="#0606060" />
            // </div>
            <p style={{ textAlign: 'center' }}>
              <b>...</b>
              <ReactLoading type="balls" />
            </p>
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <DeliveryListTable>
            <thead>
              <TableHead>
                <th>ID</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </TableHead>
            </thead>
            <tbody id="scrollableDiv" style={{ overflow: 'auto' }}>
              {deliveries.map(delivery => (
                <DeliveryItem
                  key={delivery.id}
                  delivery={delivery}
                  updateDeliveries={updateDeliveries}
                />
              ))}
            </tbody>
          </DeliveryListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
