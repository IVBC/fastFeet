import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import colors from '~/styles/colors';

const heightDevice = Dimensions.get('window').height;
// const widhtDevice = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  background: ${colors.bg};
  flex: 1;
`;

export const Background = styled.View`
  background: ${colors.primary};
  height: ${`${heightDevice * 0.2}px`};
`;

export const Content = styled.View`
  margin-top: ${`${heightDevice * 0.21 * -1 + 60}px`};
  /* margin-bottom: 170px; */
  flex: 1;
`;

export const StatusBar = styled.StatusBar.attrs(() => ({
  backgroundColor: colors.primary,
  barStyle: 'light-content',
}))``;
