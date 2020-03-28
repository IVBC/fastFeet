import styled from 'styled-components/native';

export const FlatList = styled.FlatList.attrs(() => ({
  keyExtractor: (item) => item.id,
  onEndReachedThreshold: 0.3,
  showsVerticalScrollIndicator: false,
  removeClippedSubviews: true,
  initialNumToRender: 10,
  maxToRenderPerBatch: 100,
}))`
  width: 100%;
`;
