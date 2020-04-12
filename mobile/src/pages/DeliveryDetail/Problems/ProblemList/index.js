import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { useRoute } from '@react-navigation/native';

import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Loading from '~/components/Loading';
import EmptyListMessage from '~/components/ListEmptyMessage';

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

const ProblemList = () => {
  const {
    params: { deliveryId },
  } = useRoute();

  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const loadMore = useCallback(async () => {
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

      setPage(page + 1);
      const newData = _problems.map((d) => ({
        ...d,
        createdAt: format(new Date(d.createdAt), "dd'/'MM'/'y", {
          locale: pt,
        }),
      }));

      setProblems([...problems, ...newData]);
      setTotalPages(_totatlPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Não foi possível carregar os problemas.');
    }
  }, [deliveryId, loading, page, problems, totalPages]);

  useEffect(() => {
    loadMore();
  }, []);

  const renderFooter = useMemo(() => {
    if (loading) {
      return <Loading />;
    }
    return null;
  }, [loading]);

  const renderEmpty = useCallback(() => {
    if (!loading) {
      return (
        <EmptyListMessage
          iconName="clipboard-check-outline"
          message="Nenhum Problema foi registrado."
        />
      );
    }
    return null;
  }, [loading]);

  return (
    <Background>
      <Container>
        <TitleContainer>
          <ListTitle>Encomenda {deliveryId}</ListTitle>
        </TitleContainer>
        <Content>
          <List
            data={problems}
            renderItem={({ item: problem }) => (
              <Card>
                <CardProblem multiline textAlignVertical="top">
                  {problem.description}
                </CardProblem>
                <CardDate>{problem.createdAt}</CardDate>
              </Card>
            )}
            onEndReached={loadMore}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </Content>
      </Container>
    </Background>
  );
};

export default ProblemList;
