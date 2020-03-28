import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import { Container, Form, Logo, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = useCallback(
    ({ id }) => {
      dispatch(signInRequest(id));
    },
    [dispatch]
  );

  return (
    <Container>
      <Logo />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormInput
          name="id"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          autoCorrect={false}
          autCapitalize="none"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton
          loading={loading}
          onPress={() => formRef.current.submitForm()}
        >
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
