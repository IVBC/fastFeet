import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StyledButton from '~/components/Button';

import colors from '~/styles/colors';

export const Content = styled.View`
  height: 100%;
`;

export const CameraContent = styled.View`
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  overflow: hidden;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  border: 2px solid ${colors.border};
  overflow: hidden;
  border-radius: 8px;
`;

export const SnapButtonContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 22px;
`;

export const SnapButton = styled.TouchableOpacity`
  height: 62px;
  width: 62px;
  border-radius: 31px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const SnapIcon = styled(Icon).attrs(() => ({
  name: 'camera-alt',
  size: 26,
  color: colors.bg,
}))``;

export const Preview = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  padding: 5px;
  flex: 1;
  border: 2px solid ${colors.border};
  overflow: hidden;
  border-radius: 8px;
  elevation: 3;
`;

export const ButtonsPreviewContent = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 40px;
`;

export const ButtonsPreviewIcon = styled(Icon).attrs(() => ({
  size: 25,
  color: colors.bg,
}))``;

export const ButtonsPreview = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonContent = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const Button = styled(StyledButton)`
  margin: 0px;
`;
