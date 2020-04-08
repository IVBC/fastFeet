import styled from 'styled-components/native';
import StyledIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalIndicator: false,
  contentContainerStyle: { padding: 20 },
}))``;

export const Icon = styled(StyledIcon).attrs(({ color }) => ({
  size: 24,
  color: color || colors.primary,
}))``;

export const Card = styled.View`
  background-color: ${colors.bg};
  margin-top: 10px;
  border-radius: 4px;
  padding: 12px;
  /* border: 2px solid ${colors.border}; */
  elevation: ${(props) => (props.elevation ? props.elevation : 3)};
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
  margin-left: 10px;
`;

export const CardRow = styled.View`
  margin-top: 6px;
  margin-top: 15px;
  flex-direction: row;
`;

export const CardLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const CardValue = styled.Text`
  font-size: 14px;
  color: ${colors.font};
`;

export const CardActions = styled.View`
  border-radius: 4px;
  padding: 0px;
`;

export const ButtonContent = styled.View`
  flex: 1;
  border: 2px solid ${colors.border};
  elevation: 6;
  background-color: ${colors.secondary};
  /* padding: 15px; */
`;

export const ActionButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  flex: 1;
  border: 2px solid black;
  margin: 15px;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.fontLight};
`;
