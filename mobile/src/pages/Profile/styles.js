import styled from 'styled-components/native';
import Button from '~/components/Button';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.bg};
`;

export const Content = styled.ScrollView.attrs(() => ({
  showsVerticalIndicator: false,
  contentContainerStyle: {
    padding: 20,
    alignItems: 'center',
    paddingHorizontal: 36,
  },
}))``;

export const Card = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${colors.font};
`;

export const TextValue = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.fontDark};
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 20px;
  background-color: ${colors.red};
  width: 100%;
`;

export const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  margin: 40px;
`;
