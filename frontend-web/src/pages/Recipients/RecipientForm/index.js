import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { SaveButton, BackButton } from '~/components/MenuButton';

import Input from '~/components/Form/Input';

import InputMask from '~/components/Form/InputWithMask';

import { Container, InitialContent, Buttons, FormContainer } from './styles';

export default function RecipientForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const response = await api.get(`recipients/${id}`);
        const { data } = response;

        ref.current.setData(data);
      } catch (err) {
        toast.error('Não foi possível carregar o Destinatário.');

        history.push('/recipients');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  async function createNewRecipient(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string(),
        state: Yup.string().required('O estado é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        zipcode: Yup.string()
          .matches(/[0-9]{5}-[\d]{3}/, 'CEP inválido')
          .required('O CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, street, number, complement, state, city, zipcode } = data;

      await api.post('recipients', {
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      });

      toast.success('Destinatário cadastrado com sucesso!');
      history.push('/recipients');
    } catch (err) {
      const validationErrors = {};
      if (err instanceof ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        ref.current.setErrors(validationErrors);
      } else {
        toast.error('Erro ao cadastrar destinatário, Verifique os dados!');
      }
    }
  }

  async function editRecipient(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string(),
        state: Yup.string().required('O estado é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        zipcode: Yup.string()
          .matches(/[0-9]{5}-[\d]{3}/, 'CEP inválido')
          .required('O CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, street, number, complement, state, city, zipcode } = data;

      await api.put(`recipients/${id}`, {
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      });

      toast.success('Destinatário editado com sucesso!');
      history.push('/recipients');
    } catch (err) {
      const validationErrors = {};
      if (err instanceof ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        ref.current.setErrors(validationErrors);
      } else {
        toast.error('Erro ao editar destinatário, Verifique os dados!');
      }
    }
  }

  function handleSubmmit(data) {
    if (id) {
      editRecipient(data);
    } else {
      createNewRecipient(data);
    }
  }

  return (
    <Container>
      <InitialContent>
        {id ? (
          <strong>Edição de destinatários</strong>
        ) : (
          <strong>Cadastro de destinatários</strong>
        )}
        <Buttons>
          <BackButton />
          <SaveButton
            loading={loading}
            action={() => ref.current.submitForm()}
          />
        </Buttons>
      </InitialContent>

      <FormContainer>
        <Form ref={ref} onSubmit={handleSubmmit}>
          <Input
            name="name"
            type="text"
            label="Nome"
            placeholder="Ludwig van Beethoven"
            disabled={loading}
          />

          <div>
            <div>
              <Input
                name="street"
                type="text"
                label="Rua"
                placeholder="Rua Beethoven"
                disabled={loading}
              />
            </div>

            <Input
              name="number"
              type="text"
              label="Número"
              placeholder="1729"
              disabled={loading}
            />

            <Input
              name="complement"
              type="text"
              label="Complemento"
              disabled={loading}
            />
          </div>
          <div>
            <Input
              name="city"
              type="text"
              label="Cidade"
              placeholder="Diadema"
              disabled={loading}
            />

            <Input
              name="state"
              type="text"
              label="Estado"
              placeholder="São Paulo"
              disabled={loading}
            />

            <InputMask
              disabled={loading}
              label="CEP"
              name="zipcode"
              id="zip"
              type="text"
              placeholder="09960-580"
              nKeyPress={e =>
                e.key === 'Enter' ? ref.current.submitForm() : null
              }
              mask="99999-999"
            />
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}
