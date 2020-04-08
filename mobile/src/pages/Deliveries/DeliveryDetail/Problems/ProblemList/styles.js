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
`;

export const Card = styled.View`
  border: 1px solid ${colors.border};
  border-radius: 4px;
  elevation: 3;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${colors.bg};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardProblem = styled.Text`
  font-size: 16px;
  font-weight: bold;
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
  showsVerticalScrollIndicator: true,
  // removeClippedSubviews: true,
  // initialNumToRender: 10,
  // maxToRenderPerBatch: 100,
})`
  margin-bottom: 15px;
  border-width: 3px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-top-color: ${colors.border};
`;
