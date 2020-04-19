import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { MdMarkunreadMailbox } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/MenuButton';
import SearchField from '~/components/Form/SearchField';
import RecipientItem from './RecipientItemTable';
import ListEmptyMessage from '~/components/ListEmptyMessage';
import LoadingLine from '~/components/LoadingLine';

import {
  Container,
  InitialContent,
  RecipientListTable,
  TableHead,
  LoadingContent,
} from './styles';
import colors from '~/styles/colors';

export default function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function loadRecipients() {
      try {
        setLoading(true);
        const response = await api.get('recipients', {
          params: {
            q: searchValue,
          },
        });
        const {
          data: { recipients: _recipients, count },
        } = response;
        setRecipients(_recipients);
        setPage(2);
        setTotal(count);
      } catch (err) {
        toast.error('Não foi possível carregar os destinatários.');
      } finally {
        setLoading(false);
      }
    }

    loadRecipients();
  }, [searchValue]);

  async function fetchMoreData() {
    if (loading) return;

    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });
    const {
      data: { recipients: _recipients, count },
    } = response;

    setTotal(count);
    setRecipients([...recipients, ..._recipients]);

    setPage(page + 1);
  }

  useEffect(() => {
    if (total && recipients.length === total) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [recipients.length, total]);

  async function updateRecipients() {
    async function loadRecipients() {
      try {
        setLoading(true);
        const response = await api.get('recipients', {
          params: {
            q: searchValue,
          },
        });
        const {
          data: { recipients: _recipients, count },
        } = response;

        setRecipients(_recipients);
        setTotal(count);
        setPage(2);
      } catch (err) {
        toast.error('Não foi possível carregar os destinatários.');
      } finally {
        setLoading(false);
      }
    }

    loadRecipients();
  }

  const onChange = useCallback(async event => {
    setSearchValue(event.target.value);
  }, []);

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
                <>
                  {recipients.length === 0 ? (
                    <ListEmptyMessage
                      icon={MdMarkunreadMailbox}
                      message="Não há destinatários registrados ainda"
                    />
                  ) : (
                    recipients.map(recipient => (
                      <RecipientItem
                        key={recipient.id}
                        recipient={recipient}
                        updateRecipients={updateRecipients}
                      />
                    ))
                  )}
                </>
              )}
            </tbody>
          </RecipientListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
