import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { MdGroup } from 'react-icons/md';
import LoadingLine from '~/components/LoadingLine';

import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/MenuButton';
import SearchField from '~/components/Form/SearchField';

import colors from '~/styles/colors';
import {
  Container,
  InitialContent,
  DeliveryListTable,
  TableHead,
  LoadingContent,
} from './styles';

import DelivererItem from './DelivererItemTable';
import ListEmptyMessage from '~/components/ListEmptyMessage';

export default function DelivererList() {
  const [deliverers, setDeliverers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function loadDeliverers() {
      try {
        setLoading(true);
        const response = await api.get('deliverers', {
          params: {
            q: searchValue,
          },
        });
        const {
          data: { deliverers: _deliverers, count },
        } = response;

        setDeliverers(_deliverers);
        setPage(2);
        setTotal(count);
      } catch (err) {
        toast.error('Não foi possível carregar os entregadores.');
      } finally {
        setLoading(false);
      }
    }

    loadDeliverers();
  }, [searchValue]);

  async function fetchMoreData() {
    if (loading) return;

    const response = await api.get('/deliverers', {
      params: {
        page,
      },
    });
    const {
      data: { deliverers: _deliverers, count },
    } = response;

    setTotal(count);
    setDeliverers([...deliverers, ..._deliverers]);

    setPage(page + 1);
  }

  useEffect(() => {
    if (total && deliverers.length === total) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [deliverers.length, total]);

  async function updateDeliverers() {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const response = await api.get('deliverers', {
          params: {
            q: searchValue,
          },
        });
        const {
          data: { deliverers: _deliverers, count },
        } = response;

        setDeliverers(_deliverers);
        setTotal(count);
        setPage(2);
      } catch (err) {
        toast.error('Não foi possível carregar as entregas.');
      } finally {
        setLoading(false);
      }
    }

    loadDeliveries();
  }
  const onChange = useCallback(async event => {
    setSearchValue(event.target.value);
  }, []);

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
            <LoadingContent>
              <ReactLoading
                type="bars"
                height={36}
                width={36}
                color={colors.fontLigh}
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
                <>
                  {deliverers.length === 0 ? (
                    <ListEmptyMessage
                      icon={MdGroup}
                      message="Não há entregadores registrados ainda"
                    />
                  ) : (
                    deliverers.map(deliveryman => (
                      <DelivererItem
                        key={deliveryman.id}
                        deliveryman={deliveryman}
                        updateDeliverers={updateDeliverers}
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
