import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdRemoveRedEye,
  MdDeleteSweep,
} from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';

import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';

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
  ModalContainer,
  ImageContainer,
  Title,
} from './styles';

export default function OrderItem({ delivery, updateDeliveries }) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [formatedDates, setFormatedDates] = useState({});

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
        : 'Produto ainda não retirado';
      const end_date = delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : 'Produto ainda não entregue';
      return setFormatedDates({ start_date, end_date });
    }

    defineStatus();
    formatDates();
  }, [delivery]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    const deleteDelivery = async () => {
      try {
        await api.delete(`/deliveries/${delivery.id}`);
        updateDeliveries();
        toast.success(`Encomenda #${delivery.id} foi excluida com sucesso!`);
      } catch (err) {
        toast.error('Erro ao excluir encomenda!');
      }
    };

    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => {
        return (
          <ConfirmAlert
            callback={() => deleteDelivery()}
            onClose={onClose}
            title="Deseja excluir esta entrega?"
            iconTitle={MdDeleteSweep}
            message={
              <>
                <p>
                  <strong>ID: </strong>
                  {delivery.id}
                </p>
                <p>
                  <strong>Produto: </strong>
                  {delivery.product}
                </p>
                <p>
                  Se confirmar, a entrega <strong>#{delivery.id}</strong> será
                  removida permanentemente. Deseja realmente excluí-la?
                </p>
              </>
            }
          />
        );
      },
    });
  }

  return (
    <Container statusColor={status.color} statusBackground={status.background}>
      <td data-label="ID">
        <FirstItem>#{(delivery.id < 10 ? '0' : null) + delivery.id}</FirstItem>
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
              <MdMoreHoriz color={colors.grey} size={25} />
            </Badge>
            <OptionsList visible={visible}>
              <Option>
                <Button
                  onClick={() => {
                    handleToggleVisible();
                    setModalOpen(true);
                  }}
                >
                  <MdRemoveRedEye color={colors.primary} size={16} />
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
                      zIndex: 200,
                    },
                    content: {
                      background: colors.second,
                      width: '100%',
                      maxWidth: 450,
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
                      <span>{delivery.recipient.zipcode}</span>
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
                  <MdEdit color={colors.blue} size={16} />
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

OrderItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  delivery: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    canceled_at: PropTypes.string,
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    recipient: PropTypes.shape({
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.string,
    }),
    signature: PropTypes.shape({ url: PropTypes.string }),
  }).isRequired,
};
