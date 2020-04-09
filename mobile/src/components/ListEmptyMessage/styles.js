import styled from 'styled-components/native';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '~/styles/colors';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: transparent;
`;

export const Icon = styled(IconMD).attrs({
  size: 60,
  color: '#999',
})``;

export const Text = styled.Text`
  color: ${colors.grey};
  font-weight: bold;
  font-size: 18px;
`;
