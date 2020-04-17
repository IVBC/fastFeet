import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { MdLocalShipping } from 'react-icons/md';
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
  LoadingContent,
} from './styles';

import DeliveryItem from './DeliveryItemTable';
import ListEmptyMessage from '~/components/ListEmptyMessage';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  console.log(hasMore);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const response = await api.get('deliveries', {
          params: {
            q: searchValue,
          },
        });
        const {
          data: { deliveries: _deliveries, count },
        } = response;

        setDeliveries(_deliveries);
        setTotal(count);
      } catch (err) {
        toast.error('Não foi possível carregar as entregas.');
      } finally {
        setLoading(false);
      }
    }
    console.log('loadDeliveries');
    loadDeliveries();
  }, [searchValue]);

  async function fetchMoreData() {
    console.log('fetchMoreData');
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
    setTotal(count);
    setDeliveries([...deliveries, ..._deliveries]);

    setPage(page + 1);
    // setLoading(false);
  }

  useEffect(() => {
    console.log(deliveries.length, total);
    if (total && deliveries.length === total) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [deliveries.length, total]);

  async function updateDeliveries() {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const response = await api.get('deliveries', {
          params: {
            q: searchValue,
          },
        });
        const {
          data: { deliveries: _deliveries, count },
        } = response;

        setDeliveries(_deliveries);
        setTotal(count);
        setPage(2);
      } catch (err) {
        toast.error('Não foi possível carregar as entregas.');
      } finally {
        setLoading(false);
      }
    }
    console.log('loadDeliveries');
    loadDeliveries();
  }

  const onChange = useCallback(async event => {
    console.log('onChange');

    setSearchValue(event.target.value);
  }, []);

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando encomendas</strong>
        <aside>
          <SearchField onChange={onChange} placeholder="encomendas" />
          <AddButton
            onClick={useCallback(() => history.push('/deliveries/new'), [])}
          />
        </aside>
      </InitialContent>
      <div>
        <InfiniteScroll
          dataLength={deliveries.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <LoadingContent>
              <ReactLoading
                type="bars"
                height={36}
                width={36}
                color="#7d7b7b"
              />
            </LoadingContent>
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            <LoadingContent>
              <b>Opa! Você já viu tudo =)</b>
            </LoadingContent>
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
                <>
                  {deliveries.length === 0 ? (
                    <ListEmptyMessage
                      icon={MdLocalShipping}
                      message="Não há encomendas registradas ainda"
                    />
                  ) : (
                    deliveries.map(delivery => (
                      <DeliveryItem
                        key={delivery.id}
                        delivery={delivery}
                        updateDeliveries={updateDeliveries}
                      />
                    ))
                  )}
                </>
              )}
            </tbody>
          </DeliveryListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
