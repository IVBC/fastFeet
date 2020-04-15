import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdRemoveRedEye,
} from 'react-icons/md';
import { parseISO, format } from 'date-fns';
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
  ModalContainer,
  ImageContainer,
  Title,
} from './styles';

export default function OrderItem({ delivery, updateDeliveries }) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [formatedDates, setFormatedDates] = useState({});

  console.log('DeliveryItem');

  useEffect(() => {
    function defineStatus() {
      if (delivery.canceled_at) {
        return setStatus({
          text: 'CANCELADA',
          color: '#DE3B3B',
          background: '#FAB0B0',
        });
      }

      if (!delivery.start_date) {
        return setStatus({
          text: 'PENDENTE',
          color: '#c1bc35',
          background: '#f0f0df',
        });
      }
      if (!delivery.end_date) {
        return setStatus({
          text: 'RETIRADA',
          color: '#4D85EE',
          background: '#BAD2FF',
        });
      }

      return setStatus({
        text: 'ENTREGUE',
        color: '#2CA42B',
        background: '#DFF0DF',
      });
    }

    function formatDates() {
      const start_date = delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : 'Produto não foi retirado';
      const end_date = delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : 'Produto não foi entregue ';
      return setFormatedDates({ start_date, end_date });
    }

    defineStatus();
    formatDates();
  }, [delivery]);

  function handleToggleVisible() {
    console.log('handleToggleVisible');
    setVisible(!visible);
  }

  async function handleDelete() {
    console.log('handleDelete');
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Você tem certeza que deseja excluir?');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/deliveries/${delivery.id}`);
      updateDeliveries();
      toast.success('Encomenda excluida com sucesso!');
    } catch (err) {
      console.log(err);
      toast.error('Erro ao excluir encomenda!');
    }
  }

  return (
    <Container statusColor={status.color} statusBackground={status.background}>
      <td data-label="ID">
        <FirstItem>#{delivery.id}</FirstItem>
      </td>
      <td data-label="Destinatário">
        <div>
          <p>{delivery.recipient.name}</p>
        </div>
      </td>
      <td data-label="Encomenda">
        <div>
          <p>{delivery.product}</p>
        </div>
      </td>
      <td data-label="Entregador">
        <div>
          {delivery.deliveryman.avatar ? (
            <img
              src={delivery.deliveryman.avatar.url}
              alt={delivery.deliveryman.name}
            />
          ) : (
            <DefaultAvatar name={delivery.deliveryman.name} size={35} />
          )}

          <p>{delivery.deliveryman.name}</p>
        </div>
      </td>
      <td data-label="Cidade">
        <div>
          <p>{delivery.recipient.city}</p>
        </div>
      </td>
      <td data-label="Estado">
        <div>
          <p>{delivery.recipient.state}</p>
        </div>
      </td>
      <td data-label="Status">
        <div>
          <div>
            <div />
            <strong>{status.text}</strong>
          </div>
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
                    handleToggleVisible();
                    setModalOpen(true);
                  }}
                >
                  <MdRemoveRedEye color="#8E5BE8" size={16} />
                  <p>Visualizar</p>
                </Button>

                <Modal
                  isOpen={modalOpen}
                  onRequestClose={() => {
                    setModalOpen(false);
                  }}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick
                  shouldCloseOnEsc
                  shouldReturnFocusAfterClose
                  style={{
                    overlay: {
                      background: 'Rgba(0,0,0,0.7)',
                    },
                    content: {
                      background: '#fff',
                      width: 450,
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                    },
                  }}
                >
                  <ModalContainer>
                    <div>
                      <Title>Informações da encomenda</Title>
                      <span>
                        {delivery.recipient.street}, {delivery.recipient.number}
                      </span>
                      <span>
                        {delivery.recipient.city} - {delivery.recipient.state}
                      </span>
                      <span>{delivery.recipient.cep}</span>
                    </div>
                    <aside>
                      <Title>Datas</Title>
                      <div>
                        <strong>Retirada: </strong>
                        <span>{formatedDates.start_date}</span>
                      </div>
                      <div>
                        <strong>Entrega: </strong>
                        <span>{formatedDates.end_date}</span>
                      </div>
                    </aside>
                    <Title>Assinatura do destinatário </Title>
                    <div>
                      <ImageContainer>
                        <br />
                        {delivery.signature ? (
                          <img src={delivery.signature.url} alt="assinatura" />
                        ) : (
                          <span>Não possui assinatura</span>
                        )}
                      </ImageContainer>
                    </div>
                  </ModalContainer>
                </Modal>
              </Option>
              <Option>
                <Button
                  onClick={() => {
                    history.push(`/deliveries/edit/${delivery.id}`);
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

OrderItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  delivery: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
