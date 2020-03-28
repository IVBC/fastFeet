import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 18px;
  background-color: ${colors.bg};
`;

export const ProfileContainer = styled.View`
  align-self: stretch;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;

export const ProfileContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Welcome = styled.Text`
  font-size: 14px;
  color: ${colors.fontLight};
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const SignOutButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
