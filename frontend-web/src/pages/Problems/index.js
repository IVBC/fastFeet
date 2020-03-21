import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import LoadingLine from '~/components/LoadingLine';

import api from '~/services/api';

import {
  Container,
  InitialContent,
  ProblemListTable,
  TableHead,
} from './styles';

import ProblemItem from './ProblemItemTable';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);
        const response = await api.get('delivery/problems');
        const {
          data: { problems: _problems },
        } = response;
        setProblems(_problems);
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

    loadProblems();
  }, []);

  async function fetchMoreData() {
    if (loading) return;

    // setLoading(true);

    const response = await api.get('delivery/problems', {
      params: {
        page,
      },
    });
    const {
      data: { problems: _problems, count },
    } = response;

    setProblems([...problems, ..._problems]);

    setPage(page + 1);
    // setLoading(false);
    if (problems.length >= count) {
      setHasMore(false);
    }
  }

  async function updateProblems() {
    const response = await api.get('delivery/problems');
    const {
      data: { problems: _problems },
    } = response;

    setProblems(_problems);
  }

  // async function onChange(event) {
  //   const response = await api.get(`problems?q=${event.target.value}`);
  //   const {
  //     data: { problems: _problems },
  //   } = response;
  //   setProblems(_problems);
  // }

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando destinatários</strong>
      </InitialContent>
      <div>
        <InfiniteScroll
          dataLength={problems.length}
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
                problems.map(problem => (
                  <ProblemItem
                    key={problem.id}
                    problem={problem}
                    updateProblems={updateProblems}
                  />
                ))
              )}
            </tbody>
          </ProblemListTable>
          {null}
        </InfiniteScroll>
      </div>
    </Container>
  );
}
