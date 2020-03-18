import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';

import history from '~/services/history';
import api from '~/services/api';

import { SaveButton, BackButton } from '~/components/MenuButton';

import Input from '~/components/Form/Input';
import AsyncSelectInput from '~/components/Form/AsyncSelectInput';

import {
  Container,
  InitialContent,
  Buttons,
  FormContainer,
  Content,
} from './styles';

export default function OrderForm() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      const response = await api.get(`deliveries/${id}`);
      const { data } = response;

      setOrderData(data);

      // setSelectedDeliveryman({
      //   value: data.deliveryman.id,
      //   label: data.deliveryman.name,
      // });
      ref.current.setData(response.data);
      ref.current.setFieldValue('recipient_id', {
        value: response.data.recipient.id,
        label: response.data.recipient.name,
      });
      ref.current.setFieldValue('deliveryman_id', {
        value: response.data.deliveryman.id,
        label: response.data.deliveryman.name,
      });
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  const customStylesSelectInput = {
    control: provided => ({
      ...provided,
      height: 45,
      width: '100%',
    }),
  };

  const loadRecipients = useCallback(async inputValue => {
    const response = await api.get('/recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));

    return data;
  }, []);

  async function loadDeliverymen(inputValue) {
    const response = await api.get('/deliverers', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    return data;
  }

  async function createNewOrder(data) {
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { recipient_id, deliveryman_id, product } = data;

      await api.post('deliveries', {
        recipient_id,
        deliveryman_id,
        product,
      });

      toast.success('Encomenda cadastrada com sucesso!');
      history.push('/deliveries');
    } catch (err) {
      toast.error('Erro ao cadastrar encomenda, Verifique os dados!');
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        ref.current.setErrors(errorMessages);
      }
    }
  }

  async function editOrder(data) {
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { recipient_id, deliveryman_id, product } = data;

      await api.put(`deliveries/${id}`, {
        recipient_id,
        deliveryman_id,
        product,
      });

      toast.success('A Entrega foi editada com sucesso!');
      history.push('/deliveries');
    } catch (err) {
      toast.error('Erro ao editar entregas, Verifique os dados!');
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        ref.current.setErrors(errorMessages);
      }
    }
  }

  function handleSubmmit(data) {
    if (id) {
      editOrder(data);
    } else {
      createNewOrder(data);
    }
  }

  return (
    <Container>
      <Content>
        <InitialContent>
          {id ? (
            <strong>Edição de encomendas</strong>
          ) : (
            <strong>Cadastro de encomendas</strong>
          )}
          <Buttons>
            <BackButton />
            <SaveButton action={() => ref.current.submitForm()} />
          </Buttons>
        </InitialContent>
        <FormContainer>
          <Form ref={ref} initialData={orderData} onSubmit={handleSubmmit}>
            <aside>
              <AsyncSelectInput
                type="text"
                label="Destinatário"
                name="recipient_id"
                placeholder="Destinatários"
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
                loadOptions={loadRecipients}
                styles={customStylesSelectInput}
              />
              <AsyncSelectInput
                type="text"
                label="Entregador"
                name="deliveryman_id"
                placeholder="Entregadores"
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
                loadOptions={loadDeliverymen}
                styles={customStylesSelectInput}
                // value={selectedDeliveryman}
                // onChange={setSelectedDeliveryman}
              />
            </aside>
            <span>
              <Input
                name="product"
                type="text"
                label="Nome do produto"
                placeholder="Encomenda"
                onKeyPress={e =>
                  e.key === 'Enter' ? ref.current.submitForm() : null
                }
              />
            </span>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
}

// OrderForm.propTypes = {
//   match: PropTypes.object,
// };

OrderForm.defaultProps = {
  match: null,
};
