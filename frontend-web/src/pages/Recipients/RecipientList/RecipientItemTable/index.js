import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdDeleteSweep,
} from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import ConfirmAlert from '~/components/ConfirmAlert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

export default function RecipientItem({ recipient, updateRecipients }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    const deleteDelivery = async () => {
      try {
        await api.delete(`/recipients/${recipient.id}`);
        updateRecipients();
        toast.success(
          `Destinatário #${recipient.id} foi excluido com sucesso!`
        );
      } catch (err) {
        console.tron.log(err);
        toast.error('Erro ao excluir destinatário!');
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmAlert
            callback={() => deleteDelivery()}
            onClose={onClose}
            title="Deseja excluir este destinatário?"
            iconTitle={MdDeleteSweep}
            message={
              <>
                <p>
                  <strong>ID: </strong>
                  {recipient.id}
                </p>
                <p>
                  <strong>Nome: </strong>
                  {recipient.name}
                </p>
                <p>
                  Se confirmar, o destinatário <strong>#{recipient.id}</strong>{' '}
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
        <FirstItem>#{recipient.id}</FirstItem>
      </td>
      <td data-label="Nome">
        <div>
          <p>{recipient.name}</p>
        </div>
      </td>
      <td data-label="Endereço">
        <div>
          <p>
            {`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}
          </p>
        </div>
      </td>
      <td data-label="Ações">
        <LastItem>
          <OptionsContainer>
            <Badge visible={visible} onClick={handleToggleVisible}>
              <MdMoreHoriz color="#C6C6C6" size={25} />
            </Badge>
            <OptionsList visible={visible}>
              <Option>
                <Button
                  onClick={() => {
                    history.push(`/recipients/edit/${recipient.id}`);
                  }}
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <p>Editar</p>
                </Button>
              </Option>
              <LastOption>
                <Button
                  onClick={() => {
                    handleToggleVisible();
                    handleDelete();
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

RecipientItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  recipient: PropTypes.object.isRequired,
  updateRecipients: PropTypes.func.isRequired,
};
