import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.View`
  padding: 20px;
  height: 100%;
`;

export const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.bg};
  margin-bottom: 12px;
`;

export const Content = styled.View`
  border-radius: 4px;
  flex: 1;
`;

export const Card = styled.View`
  border: 2px solid ${colors.border};
  border-radius: 4px;
  /* elevation: 1; */
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${colors.bg};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardProblem = styled.Text`
  font-size: 16px;
  /* font-weight: bold; */
  color: ${colors.fontLight};
  margin-bottom: 5px;
  flex: 1;
  margin-left: 4px;
`;

export const CardDate = styled.Text`
  color: ${colors.fontTransparent};
`;

export const List = styled.FlatList.attrs({
  keyExtractor: (item) => item.id.toString(),
  onEndReachedThreshold: 0.2,
  showsVerticalScrollIndicator: false,
})``;
