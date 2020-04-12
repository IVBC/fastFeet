import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import colors from '~/styles/colors';

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalIndicator: false,
  contentContainerStyle: { flex: 1 },
}))``;

export const Content = styled.View`
  margin-top: 42px;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
`;

export const CameraContainer = styled.View`
  width: 100%;
  height: 88%;
  border-radius: 4px;
  overflow: hidden;
`;

export const PhotoContainer = styled.View`
  width: 100%;
  height: 88%;
  border-radius: 4px;
`;

export const Preview = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;

export const SubmitButton = styled(Button).attrs(() => ({
  background: colors.primary,
}))`
  margin-top: 15px;
`;

export const ButtonCamera = styled.TouchableOpacity`
  margin-top: -90px;
  background: #0000004d;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  align-self: center;
  margin-bottom: 22px;
`;

export const ButtonCameraIcon = styled(Icon).attrs(() => ({
  size: 25,
  color: colors.bg,
}))``;
