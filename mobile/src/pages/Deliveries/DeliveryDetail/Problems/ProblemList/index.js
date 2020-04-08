import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  TitleContainer,
  ListTitle,
  Content,
  List,
  Card,
  CardProblem,
  CardDate,
} from './styles';

const RenderItem = ({ item }) => (
  <Card>
    <CardProblem multiline textAlignVertical="top">
      {item.description}
    </CardProblem>
    <CardDate>{item.createdAt}</CardDate>
  </Card>
);

const ProblemList = ({
  route: {
    params: { deliveryId },
  },
}) => {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const loadMore = useCallback(
    async ({ reset = false } = {}) => {
      if (loading || page + 1 > totalPages) {
        return;
      }
      try {
        setLoading(true);
        const {
          data: { problems: _problems, totalPages: _totatlPages },
        } = await api.get(`delivery/${deliveryId}/problems`, {
          params: {
            page: page + 1,
            quantity: 10,
          },
        });

        console.tron.log('data', _problems);
        setPage(page + 1);
        const newData = _problems.map((d) => ({
          ...d,
          createdAt: format(new Date(d.createdAt), "dd'/'MM'/'y", {
            locale: pt,
          }),
        }));
        const prev = reset ? [] : problems;
        setProblems([...prev, ...newData]);
        setTotalPages(_totatlPages);
        setLoading(false);
      } catch (err) {
        console.tron.log(err);
        setLoading(false);
        Alert.alert('Não foi possível carregar os problemas.');
      }
    },
    [deliveryId, loading, page, problems, totalPages]
  );

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <Container>
        <TitleContainer>
          <ListTitle>Encomenda {deliveryId}</ListTitle>
        </TitleContainer>
        <Content>
          <List
            data={problems}
            renderItem={RenderItem}
            refreshing={loading}
            onEndReached={loadMore}
            onRefres={() => loadMore({ reset: true })}
          />
        </Content>
      </Container>
    </Background>
  );
};

RenderItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

ProblemList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ deliveryId: PropTypes.number.isRequired })
      .isRequired,
  }).isRequired,
};

export default ProblemList;
