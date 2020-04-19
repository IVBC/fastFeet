import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { MdFeedback } from 'react-icons/md';

import api from '~/services/api';

import LoadingLine from '~/components/LoadingLine';
import ProblemItem from './ProblemItemTable';
import ListEmptyMessage from '~/components/ListEmptyMessage';

import colors from '~/styles/colors';
import {
  Container,
  InitialContent,
  ProblemListTable,
  TableHead,
  LoadingContent,
} from './styles';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);
        const response = await api.get('delivery/problems');
        const {
          data: { problems: _problems, count },
        } = response;

        setProblems(_problems);
        setPage(2);
        setTotal(count);
      } catch (err) {
        toast.error('Não foi possível carregar os problemas.');
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }, []);

  async function fetchMoreData() {
    if (loading) return;

    const response = await api.get('delivery/problems', {
      params: {
        page,
      },
    });
    const {
      data: { problems: _problems, count },
    } = response;

    setTotal(count);
    setProblems([...problems, ..._problems]);

    setPage(page + 1);
  }

  useEffect(() => {
    if (total && problems.length === total) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [problems.length, total]);

  async function updateProblems() {
    async function loadProblems() {
      try {
        setLoading(true);
        const response = await api.get('delivery/problems');
        const {
          data: { problems: _problems, count },
        } = response;

        setTotal(count);
        setProblems(_problems);
        setPage(2);
      } catch (err) {
        toast.error('Não foi possível carregar os problemas.');
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }

  return (
    <Container>
      <InitialContent>
        <strong>Problemas na entrega</strong>
      </InitialContent>
      <div>
        <InfiniteScroll
          dataLength={problems.length}
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
          <ProblemListTable>
            <thead>
              <TableHead>
                <th>Encomenda</th>
                <th>Problema</th>
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
                </tr>
              ) : (
                <>
                  {problems.length === 0 ? (
                    <ListEmptyMessage
                      icon={MdFeedback}
                      message="Não há problemas registrados ainda"
                    />
                  ) : (
                    problems.map(problem => (
                      <ProblemItem
                        key={problem.id}
                        problem={problem}
                        updateProblems={updateProblems}
                      />
                    ))
                  )}
                </>
              )}
            </tbody>
          </ProblemListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
