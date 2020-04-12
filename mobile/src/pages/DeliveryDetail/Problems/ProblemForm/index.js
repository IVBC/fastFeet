import React, { useRef, useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Yup from 'yup';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';

import { FormContent, Form, Input, SubmitButton } from './styles';

export default function ProblemsForm() {
  const {
    params: { deliveryId },
  } = useRoute();
  const navigation = useNavigation();

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string()
            .required('A descrição é obrigatória.')
            .max(200, 'No máximo 200 caracteres.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed

        setLoading(true);
        await api.post(`/delivery/${deliveryId}/problems`, data);
        setLoading(false);
        Alert.alert('Enviado', 'O Problema foi registrado com sucesso.');
        formRef.current.clearField('description');
        navigation.goBack();
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        } else {
          Alert.alert(
            'Erro ao cadastrar o problema. Falha na comunicação com o Servidor.'
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [deliveryId, navigation]
  );

  return (
    <Background>
      <FormContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="description"
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            type="string"
            autCapitalize="none"
            returnKeyType="next"
            multiline
            textAlignVertical="top"
          />
          <SubmitButton
            loading={loading}
            onPress={() => (!loading ? formRef.current.submitForm() : null)}
          >
            Enviar
          </SubmitButton>
        </Form>
      </FormContent>
    </Background>
  );
}
