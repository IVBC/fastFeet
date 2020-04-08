import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  background: ${colors.bg};
  flex: 1;
`;

export const Background = styled.View`
  background: ${colors.primary};
  height: ${`${Dimensions.get('window').height * 0.2}px`};
`;

export const Content = styled.View`
  margin-top: ${`${Dimensions.get('window').height * 0.21 * -1 + 60}px`};
  margin-bottom: 170px;
`;

export const StatusBar = styled.StatusBar.attrs(() => ({
  backgroundColor: colors.primary,
  barStyle: 'light-content',
}))``;
