import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BorderlessButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${colors.secondary};
  padding: 1px;
  border-radius: 4px;
  margin-bottom: 28px;
  border: 1px solid ${colors.border};
`;

export const Content = styled.View`
  background-color: ${colors.bg};
  padding: 15px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const TitleIcon = styled(Icon).attrs(() => ({
  name: 'local-shipping',
  size: 24,
  color: colors.primary,
}))``;

export const TitleText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
  margin-left: 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FooterContent = styled.View`
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;

export const FooterLabel = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 8px;
  color: ${colors.fontLight};
  font-weight: bold;
`;

export const FooterInfo = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  color: ${colors.fontDark};
  font-weight: bold;
`;

export const FooterContentData = styled.View`
  flex-direction: column;
  padding: 20px;
  /* width: 110px; */
  flex: 1;
`;

export const FooterButton = styled(BorderlessButton)`
  padding-top: 8px;
`;

export const FooterButtonTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
`;
