import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { SaveButton, BackButton } from '~/components/MenuButton';
import AvatarInput from '~/components/Form/AvatarInput';
import Input from '~/components/Form/Input';

import {
  Container,
  InitialContent,
  Buttons,
  FormContainer,
  AvatarContainer,
} from './styles';

export default function DeliverymenForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [deliverymanData, setDeliverymanData] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const response = await api.get(`deliverers/${id}`);
      const { data } = response;
      setDeliverymanData(data);

      // ref.current.setData({
      //   name: data.name,
      //   email: data.email,
      //   avatar: { id: data.avatar.id, url: data.avatar.url },
      // });
      // ref.current.setFieldValue('avatar', {
      //   id: data.avatar.id,
      //   url: data.avatar.url,
      // });

      setLoading(false);
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  function setErrorFor(path, message) {
    const errors = ref.current.getErrors();

    errors[path] = message;
    ref.current.setErrors(errors);
  }

  async function createNewDeliveryman(data) {
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        avatar_id: Yup.number().required('A imagem é obrigatória'),
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar_id } = data;

      await api.post('deliverers', { name, email, avatar_id });

      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverers');
    } catch (err) {
      toast.error('Erro ao cadastrar entregador, Verifique os dados!');

      if (err instanceof ValidationError) {
        err.inner.forEach(error => {
          setErrorFor(
            error.path === 'avatar_id' ? 'avatar' : error.path,
            error.message
          );
        });
        // ref.current.setErrors(validationErrors);
      } else {
        toast.error(
          `Não foi possível ${id ? 'editar' : 'cadastrar'} o entregador.`
        );
      }
    }
  }

  async function editDeliveryman(data) {
    try {
      const schema = Yup.object().shape({
        avatar_id: Yup.number().required('A imagem é obrigatória'),
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar_id } = data;

      await api.put(`deliverers/${id}`, { name, email, avatar_id });

      toast.success('Entregador editado com sucesso!');
      history.push('/deliverers');
    } catch (err) {
      toast.error('Erro ao editar entregador, Verifique os dados!');
    }
  }

  function handleSubmmit(data) {
    if (id) {
      editDeliveryman(data);
    } else {
      createNewDeliveryman(data);
    }
  }

  return (
    <Container>
      <InitialContent>
        <strong>{id ? 'Edição' : 'Cadastro'} de entregadores</strong>
        <Buttons>
          <BackButton />
          <SaveButton action={() => ref.current.submitForm()} />
        </Buttons>
      </InitialContent>
      <FormContainer>
        <Form ref={ref} initialData={deliverymanData} onSubmit={handleSubmmit}>
          <AvatarContainer>
            <AvatarInput
              name="avatar_id"
              setErrorFor={setErrorFor}
              isLoading={loading}
            />
          </AvatarContainer>
          <Input
            disabled={loading}
            name="name"
            type="text"
            label="Nome"
            placeholder="John Doe"
          />
          <Input
            disabled={loading}
            name="email"
            type="email"
            label="Email"
            placeholder="exemplo@rocketseat.com"
            onKeyPress={e =>
              e.key === 'Enter' ? ref.current.submitForm() : null
            }
          />
        </Form>
      </FormContainer>
    </Container>
  );
}
