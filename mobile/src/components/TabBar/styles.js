import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';

export const BarButton = styled.TouchableOpacity`
  flex: 1;
  height: 75px;

  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex-direction: row;
  background-color: ${colors.bg};

  border-top-color: ${colors.border};
  border-width: 2px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  elevation: 10;
  bottom: 0;
`;

export const BarIcon = styled(Icon).attrs((props) => ({
  size: 32,
  color: props.isFocused ? colors.primary : colors.grey,
}))``;

export const Label = styled.Text`
  color: ${(props) => (props.isFocused ? colors.primary : colors.grey)};
  font-size: 14px;
  font-weight: bold;
`;
