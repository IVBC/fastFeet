import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { SaveButton, BackButton } from '~/components/MenuButton';

import Input from '~/components/Form/Input';

import { Container, InitialContent, Buttons, FormContainer } from './styles';

export default function RecipientForm() {
  const { id } = useParams();
  const [recipientData, setRecipientData] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      const response = await api.get(`recipients/${id}`);
      const { data } = response;

      setRecipientData(data);
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  async function createNewRecipient(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        street: Yup.string().required(),
        number: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        zipcode: Yup.string().required(),
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
      toast.error('Erro ao cadastrar destinatário, Verifique os dados!');
    }
  }

  async function editRecipient(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        street: Yup.string().required(),
        number: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        zipcode: Yup.string().required(),
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
      toast.error('Erro ao editar destinatário, Verifique os dados!');
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
          <SaveButton action={() => ref.current.submitForm()} />
        </Buttons>
      </InitialContent>
      <FormContainer>
        <Form ref={ref} initialData={recipientData} onSubmit={handleSubmmit}>
          <Input
            name="name"
            type="text"
            label="Nome"
            placeholder="Ludwig van Beethoven"
          />
          <div>
            <span>
              <Input
                name="street"
                type="text"
                label="Rua"
                placeholder="Rua Beethoven"
              />
            </span>
            <Input
              name="number"
              type="text"
              label="Número"
              placeholder="1729"
            />
            <Input name="complement" type="text" label="Complemento" />
          </div>
          <div>
            <Input
              name="city"
              type="text"
              label="Cidade"
              placeholder="Diadema"
            />
            <Input
              name="state"
              type="text"
              label="Estado"
              placeholder="São Paulo"
            />
            <Input
              name="zipcode"
              type="text"
              label="CEP"
              placeholder="09960-580"
              onKeyPress={e =>
                e.key === 'Enter' ? ref.current.submitForm() : null
              }
            />
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}
