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

import DelivererItem from './DelivererItemTable';

export default function DelivererList() {
  const [deliverers, setDeliverers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadDeliverers() {
      try {
        setLoading(true);
        const response = await api.get('deliverers');
        const {
          data: { deliverers: _deliverers },
        } = response;
        setDeliverers(_deliverers);
        // setTimeout(() => {
        //   setDeliveries(_deliveries);
        //   setLoading(false);
        // }, 3000);
      } catch (err) {
        toast.error('Não foi possível carregar os entregadores.');
      } finally {
        setLoading(false);
      }
    }

    loadDeliverers();
  }, []);

  async function fetchMoreData() {
    if (loading) return;

    // setLoading(true);

    const response = await api.get('/deliverers', {
      params: {
        page,
      },
    });
    const {
      data: { deliverers: _deliverers, count },
    } = response;

    setDeliverers([...deliverers, ..._deliverers]);

    setPage(page + 1);
    // setLoading(false);
    if (deliverers.length >= count) {
      setHasMore(false);
    }
  }

  async function updateDeliverers() {
    const response = await api.get('deliverers');
    const {
      data: { deliverers: _deliverers },
    } = response;

    setDeliverers(_deliverers);
  }

  async function onChange(event) {
    const response = await api.get(`deliverers?q=${event.target.value}`);
    const {
      data: { deliverers: _deliverers },
    } = response;
    setDeliverers(_deliverers);
  }

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando entregadores</strong>
        <aside>
          <SearchField onChange={onChange} placeholder="entregadores" />
          <AddButton onClick={() => history.push('/deliverers/new')} />
        </aside>
      </InitialContent>
      <div>
        <InfiniteScroll
          dataLength={deliverers.length}
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
              <b>Opa! Vocẽ já viu tudo =)</b>
            </p>
          }
        >
          <DeliveryListTable>
            <thead>
              <TableHead>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
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
                </tr>
              ) : (
                deliverers.map(deliveryman => (
                  <DelivererItem
                    key={deliveryman.id}
                    deliveryman={deliveryman}
                    updateDeliverers={updateDeliverers}
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
