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
  RecipientListTable,
  TableHead,
} from './styles';

import RecipientItem from './RecipientItemTable';

export default function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadRecipients() {
      try {
        setLoading(true);
        const response = await api.get('recipients');
        const {
          data: { recipients: _recipients },
        } = response;
        setRecipients(_recipients);
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

    loadRecipients();
  }, []);

  async function fetchMoreData() {
    if (loading) return;

    // setLoading(true);

    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });
    const {
      data: { recipients: _recipients, count },
    } = response;

    setRecipients([...recipients, ..._recipients]);

    setPage(page + 1);
    // setLoading(false);
    if (recipients.length >= count) {
      setHasMore(false);
    }
  }

  async function updateRecipients() {
    const response = await api.get('recipients');
    const {
      data: { recipients: _recipients },
    } = response;

    setRecipients(_recipients);
  }

  async function onChange(event) {
    const response = await api.get(`recipients?q=${event.target.value}`);
    const {
      data: { recipients: _recipients },
    } = response;
    setRecipients(_recipients);
  }

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando destinatários</strong>
        <aside>
          <SearchField onChange={onChange} placeholder="destinatários" />
          <AddButton onClick={() => history.push('/recipients/new')} />
        </aside>
      </InitialContent>
      <div>
        <InfiniteScroll
          dataLength={recipients.length}
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
          <RecipientListTable>
            <thead>
              <TableHead>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
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
                </tr>
              ) : (
                recipients.map(recipient => (
                  <RecipientItem
                    key={recipient.id}
                    recipient={recipient}
                    updateRecipients={updateRecipients}
                  />
                ))
              )}
            </tbody>
          </RecipientListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
