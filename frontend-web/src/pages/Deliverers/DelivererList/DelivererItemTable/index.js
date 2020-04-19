import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdDeleteSweep,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';
import history from '~/services/history';

import DefaultAvatar from '~/components/DefaultAvatar';
import ConfirmAlert from '~/components/ConfirmAlert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import colors from '~/styles/colors';
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

export default function DeliverymanItem({ deliveryman, updateDeliverers }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    const deleteDelivery = async () => {
      try {
        await api.delete(`/deliverers/${deliveryman.id}`);
        toast.success(
          `Entregador #${deliveryman.id} - ${deliveryman.name}  foi excluido com sucesso!`
        );
        updateDeliverers();
      } catch (err) {
        toast.error('Erro ao excluir entregador!');
      }
    };

    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => {
        return (
          <ConfirmAlert
            callback={() => deleteDelivery()}
            onClose={onClose}
            title="Deseja excluir este entregador?"
            iconTitle={MdDeleteSweep}
            message={
              <>
                <p>
                  <strong>ID: </strong>
                  {deliveryman.id}
                </p>
                <p>
                  <strong>Nome: </strong>
                  {deliveryman.name}
                </p>

                <p>
                  Se confirmar, o entregador <strong>#{deliveryman.id}</strong>{' '}
                  será removido permanentemente. Isso é irreversível. Deseja
                  realmente excluí-lo?
                </p>
              </>
            }
          />
        );
      },
    });
  }

  return (
    <Container>
      <td data-label="ID">
        <FirstItem>
          #{(deliveryman.id < 10 ? '0' : null) + deliveryman.id}
        </FirstItem>
      </td>
      <td data-label="Foto">
        <div>
          {deliveryman.avatar ? (
            <img src={deliveryman.avatar.url} alt={deliveryman.name} />
          ) : (
            <DefaultAvatar name={deliveryman.name} size={35} />
          )}
        </div>
      </td>
      <td data-label="Nome">
        <div>
          <p>{deliveryman.name}</p>
        </div>
      </td>
      <td data-label="Email">
        <div>
          <p>{deliveryman.email}</p>
        </div>
      </td>
      <td data-label="Ações">
        <LastItem>
          <OptionsContainer>
            <Badge visible={visible} onClick={handleToggleVisible}>
              <MdMoreHoriz color={colors.grey} size={25} />
            </Badge>
            <OptionsList visible={visible}>
              <Option>
                <Button
                  onClick={() => {
                    history.push(`/deliverers/edit/${deliveryman.id}`);
                  }}
                >
                  <MdEdit color={colors.blue} size={16} />
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
                  <MdDeleteForever color={colors.red} size={16} />
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

DeliverymanItem.propTypes = {
  deliveryman: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.shape({ url: PropTypes.string }),
  }).isRequired,
  updateDeliverers: PropTypes.func.isRequired,
};
