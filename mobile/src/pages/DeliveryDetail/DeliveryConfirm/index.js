import React, { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Content,
  CameraContainer,
  SubmitButton,
  Camera,
  Preview,
  PhotoContainer,
  ButtonCamera,
  ButtonCameraIcon,
} from './styles';

export default function ConfirmDelivery() {
  const navigation = useNavigation();
  const {
    params: { deliveryId },
  } = useRoute();

  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

  async function handleUpload() {
    if (imageUri) {
      try {
        setLoading(true);

        const dataFile = new FormData();

        dataFile.append('file', {
          type: 'image/jpg',
          uri: imageUri,
          name: 'signature.jpg',
        });

        const {
          data: { id: signature_id },
        } = await api.post('files', dataFile);

        await api.put(`/delivery/${deliveryId}/deliver`, {
          signature_id,
        });

        Alert.alert(
          'Produto entregue!',
          'A confirmação da entrega do produto foi realizada com sucesso.'
        );
        navigation.popToTop();
      } catch (err) {
        Alert.alert(
          'Não foi possível confirmar a entrega!',
          'Falha na comunicação com o servidor, verifique sua conexão com a internet.'
        );
      } finally {
        setLoading(false);
      }
    }
  }

  const handleTakePicture = useCallback(async () => {
    const options = { quality: 0.5, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);

    await setImageUri(data.uri);
  }, []);

  return (
    <Background>
      <Container>
        <Content>
          {!imageUri ? (
            <CameraContainer>
              <Camera
                ref={cameraRef}
                autoFocus={Camera.Constants.AutoFocus.on}
                flashMode={Camera.Constants.FlashMode.off}
                captureAudio={false}
              />
              <ButtonCamera onPress={handleTakePicture}>
                <ButtonCameraIcon name="camera-alt" />
              </ButtonCamera>
            </CameraContainer>
          ) : (
            <PhotoContainer>
              <Preview source={{ uri: imageUri }} />
              <ButtonCamera onPress={() => setImageUri(null)}>
                <ButtonCameraIcon name="close" />
              </ButtonCamera>
            </PhotoContainer>
          )}
          <SubmitButton
            disabled={!imageUri}
            onPress={handleUpload}
            loading={loading}
          >
            Enviar
          </SubmitButton>
        </Content>
      </Container>
    </Background>
  );
}
