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
  border-radius: 6px;

  padding: 12px;

  border: 2px solid ${colors.border};
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
  margin-left: 10px;
`;

export const Row = styled.View`
  margin-top: ${({ marginTop }) => `${marginTop ?? 15}px`};
  flex-direction: row;
`;

export const CardDate = styled.View`
  flex: 1;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const TextInfo = styled.Text`
  font-size: 14px;
  margin-top: 3px;
  color: ${colors.font};
`;

export const CardOptions = styled.View`
  border-radius: 4px;
  padding: 0px;
`;

export const ButtonContent = styled.View`
  flex: 1;
  border: 1px solid ${colors.border};
  elevation: 1;
  background-color: ${colors.secondary};
`;

export const OptionButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  flex: 1;
  border: 2px solid black;
  padding: 15px;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  color: ${colors.fontLight};
`;
