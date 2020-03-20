import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

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
    const confirm = window.confirm('Você tem certeza que deseja excluir?');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/recipients/${recipient.id}`);
      updateRecipients();
      toast.success('Destinatário excluido com sucesso!');
    } catch (err) {
      toast.error('Erro ao excluir destinatário!');
    }
  }

  return (
    <Container>
      <td>
        <FirstItem>#{recipient.id}</FirstItem>
      </td>
      <td>
        <div>
          <p>{recipient.name}</p>
        </div>
      </td>
      <td>
        <div>
          <p>
            {`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}
          </p>
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
