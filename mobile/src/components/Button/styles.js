import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled(RectButton)`
  height: 46px;
  background: ${({ background, disabled }) =>
    disabled ? colors.fontTransparent : background};
  border-radius: 4px;

  /* Dispositivos Maiores*/
  /* padding: 12px;
  width: 100%;
  max-width: 540px; */

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 18px;
`;
