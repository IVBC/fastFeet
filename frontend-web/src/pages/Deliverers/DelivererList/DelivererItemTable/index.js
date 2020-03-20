import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import DefaultAvatar from '~/components/DefaultAvatar';

import {
  Container,
  FirstItem,
  LastItem,
  Badge,
  OptionsList,
  Option,
  LastOption,
  Button,
  OptionsContainer,
} from './styles';

export default function DeliverymenItem({ deliveryman, updateDeliverers }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Você tem certeza que deseja excluir?');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/deliverers/${deliveryman.id}`);
      updateDeliverers();
      toast.success('Entregador excluido com sucesso!');
    } catch (err) {
      toast.error('Erro ao excluir entregador!');
    }
  }

  return (
    <Container>
      <td>
        <FirstItem>#{deliveryman.id}</FirstItem>
      </td>
      <td>
        <div>
          {deliveryman.avatar ? (
            <img src={deliveryman.avatar.url} alt={deliveryman.name} />
          ) : (
            <DefaultAvatar name={deliveryman.name} size={35} />
          )}
        </div>
      </td>
      <td>
        <div>
          <p>{deliveryman.name}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{deliveryman.email}</p>
        </div>
      </td>
      <td>
        <LastItem>
          <OptionsContainer>
            <Badge onClick={handleToggleVisible}>
              <MdMoreHoriz color="#C6C6C6" size={25} />
            </Badge>
            <OptionsList visible={visible}>
              <Option>
                <Button
                  onClick={() => {
                    history.push(`/deliverers/edit/${deliveryman.id}`);
                  }}
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <p>Editar</p>
                </Button>
              </Option>
              <LastOption>
                <Button
                  onClick={() => {
                    handleDelete();
                    handleToggleVisible();
                  }}
                >
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <p>Excluir</p>
                </Button>
              </LastOption>
            </OptionsList>
          </OptionsContainer>
        </LastItem>
      </td>
    </Container>
  );
}

DeliverymenItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  deliveryman: PropTypes.object.isRequired,
  updateDeliverers: PropTypes.func.isRequired,
};
