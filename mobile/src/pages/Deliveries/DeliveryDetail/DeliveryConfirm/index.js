import React, { useState, useCallback } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Loading from '~/components/Loading';

import {
  CameraContent,
  Camera,
  SnapButtonContent,
  SnapButton,
  SnapIcon,
  PreviewContent,
  Preview,
  ButtonsPreview,
  ButtonsPreviewIcon,
  Separator,
} from './styles';

export default function DeliveryConfirm() {
  const {
    params: { deliveryId },
  } = useRoute();

  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState();
  const [imageUri, setImageUri] = useState(null);

  const handleUpload = useCallback(async () => {
    try {
      setLoading(true);
      const data = new FormData();

      data.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `delivery-confirm_${deliveryId}_${new Date().getTime()}.jpg`,
      });

      const {
        data: { id: signature_id },
      } = await api.post(`/files`, data);

      const response = await api.put(`/delivery/${deliveryId}/deliver`, {
        signature_id,
      });
      if (response.status === 200) {
        Alert.alert(
          'Produto entregue!',
          'A confirmação da entrega do produto foi realizada com sucesso.'
        );
      }

      navigate('Dashboard');
    } catch (err) {
      Alert.alert(
        'Não foi possível confirmar a entrega!',
        'Falha na comunicação com o servidor, verifique sua conexão com a internet.'
      );
    } finally {
      setLoading(false);
    }
  }, [deliveryId, navigate, imageUri]);

  const takePicture = useCallback(async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };

      const data = await camera.takePictureAsync(options);

      camera.resumePreview();
      setImageUri(data.uri);
    }
  }, [camera]);

  return (
    <Background>
      {loading ? (
        <Loading size={60} />
      ) : (
        <CameraContent>
          {!imageUri ? (
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
          ) : (
            <Preview source={{ uri: imageUri }}>
              <PreviewContent>
                <ButtonsPreview onPress={() => setImageUri(null)}>
                  <ButtonsPreviewIcon name="close" />
                </ButtonsPreview>
                <Separator />
                <ButtonsPreview>
                  <ButtonsPreviewIcon name="check" onPress={handleUpload} />
                </ButtonsPreview>
              </PreviewContent>
            </Preview>
          )}
        </CameraContent>
      )}
    </Background>
  );
}
