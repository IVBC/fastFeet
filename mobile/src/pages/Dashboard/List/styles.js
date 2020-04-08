import styled from 'styled-components/native';

export const FlatList = styled.FlatList.attrs(() => ({
  onEndReachedThreshold: 0.3,
  showsVerticalScrollIndicator: false,
  removeClippedSubviews: true,
  initialNumToRender: 10,
  maxToRenderPerBatch: 100,
}))`
  width: 100%;
  margin-top: 10px;
`;
