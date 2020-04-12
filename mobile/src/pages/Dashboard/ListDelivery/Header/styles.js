import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  margin-bottom: 4px;
  padding-top: 20px;
  background-color: ${colors.bg};
`;

export const Title = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 22px;
  font-weight: bold;
  color: ${colors.fontDark};
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Button = styled(BorderlessButton)`
  height: 100%;
  justify-content: flex-end;
  margin-left: 20px;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  font-weight: bold;
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  color: ${(props) => (props.selected ? colors.primary : colors.fontLight)};
`;
