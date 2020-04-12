import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 4px;
  flex-direction: row;
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
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  align-items: flex-end;
`;

export const Button = styled(BorderlessButton)`
  /* height: 20px; */

  /* flex-shrink: 1; */
  height: 100%;
  margin-left: 20px;
  justify-content: flex-end;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.selected ? colors.primary : colors.fontLight)};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
`;
