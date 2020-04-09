/* eslint-disable no-nested-ternary */
import React, { useState, useCallback } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Loading from '~/components/Loading';

import {
  Content,
  CameraContent,
  Camera,
  SnapButtonContent,
  SnapButton,
  SnapIcon,
  Preview,
  ButtonsPreviewContent,
  ButtonsPreview,
  ButtonsPreviewIcon,
  // ButtonContent,
  // Button,
} from './styles';

export default function DeliveryConfirm() {
  const {
    params: { deliveryId },
  } = useRoute();

  const { navigate } = useNavigation();

  const [camera, setCamera] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const takePicture = useCallback(async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      camera.resumePreview();

      setImageUri(data.uri);
    }
  }, [camera]);

  const handleUploadImg = useCallback(async () => {
    try {
      setLoading(true);
      const imgData = new FormData();

      imgData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `delivery-confirm_${deliveryId}_${new Date().getTime()}.jpg`,
      });

      const {
        data: { id: signature_id },
      } = await api.post(`/files`, imgData);

      const response = await api.put(`/delivery/${deliveryId}/deliver`, {
        signature_id,
      });
      if (response.status === 200) {
        Alert.alert(
          'Produto entregue!',
          'A confirmação da entrega do produto foi realizada com sucesso.'
        );
      }
      setLoading(false);
      navigate('Dashboard');
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Não foi possível confirmar a entrega!',
        'Falha na comunicação com o servidor, verifique sua conexão com a internet.'
      );
    }
  }, [deliveryId, navigate, imageUri]);

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : !imageUri ? (
        <Content>
          <CameraContent>
            <Camera
              ref={setCamera}
              captureAudio={false}
              pauseAfterCapture
              autoFocus={Camera.Constants.AutoFocus.on}
              flashMode={Camera.Constants.FlashMode.off}
            >
              <SnapButtonContent>
                <SnapButton onPress={takePicture}>
                  <SnapIcon />
                </SnapButton>
              </SnapButtonContent>
            </Camera>
          </CameraContent>

          {/* <ButtonContent>
            <Button onPress={takePicture}>Confirmar</Button>
          </ButtonContent> */}
        </Content>
      ) : (
        <CameraContent>
          <Preview source={{ uri: imageUri }}>
            <ButtonsPreviewContent>
              <ButtonsPreview onPress={() => setImageUri(null)}>
                <ButtonsPreviewIcon name="close" />
              </ButtonsPreview>
              <ButtonsPreview>
                <ButtonsPreviewIcon name="check" onPress={handleUploadImg} />
              </ButtonsPreview>
            </ButtonsPreviewContent>
          </Preview>
        </CameraContent>
      )}
    </Background>
  );
}
