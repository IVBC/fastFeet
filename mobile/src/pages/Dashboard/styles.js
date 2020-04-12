import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.bg};
  padding: 18px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background-color: transparent;
  padding: 10px;
`;

export const ProfileContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TitleWelcome = styled.Text`
  color: ${colors.fontLight};
  font-size: 14px;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const SignOutButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;
