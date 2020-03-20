import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import LoadingLine from '~/components/LoadingLine';

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
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const response = await api.get('deliveries');
        const {
          data: { deliveries: _deliveries },
        } = response;
        setDeliveries(_deliveries);
        // setTimeout(() => {
        //   setDeliveries(_deliveries);
        //   setLoading(false);
        // }, 3000);
      } catch (err) {
        toast.error('Não foi possível carregar as entregas.');
      } finally {
        setLoading(false);
      }
    }

    loadDeliveries();
  }, []);

  async function fetchMoreData() {
    if (loading) return;

    // setLoading(true);

    const response = await api.get('/deliveries', {
      params: {
        page,
      },
    });
    const {
      data: { deliveries: _deliveries, count },
    } = response;

    setDeliveries([...deliveries, ..._deliveries]);

    setPage(page + 1);
    // setLoading(false);
    if (deliveries.length >= count) {
      setHasMore(false);
    }
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
              {/* <ReactLoading type="balls" /> */}
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
                <th>Encomenda</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </TableHead>
            </thead>
            <tbody id="scrollableDiv" style={{ overflow: 'auto' }}>
              {loading ? (
                <tr>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                  <td>
                    <LoadingLine />
                  </td>
                </tr>
              ) : (
                deliveries.map(delivery => (
                  <DeliveryItem
                    key={delivery.id}
                    delivery={delivery}
                    updateDeliveries={updateDeliveries}
                  />
                ))
              )}
            </tbody>
          </DeliveryListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
