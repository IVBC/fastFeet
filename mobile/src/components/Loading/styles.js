import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Activity = styled.ActivityIndicator.attrs((props) => ({
  color: props.background ? props.background : colors.primary,
}))``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
