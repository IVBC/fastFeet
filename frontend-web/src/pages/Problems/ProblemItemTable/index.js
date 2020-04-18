import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdDeleteForever,
  MdEventBusy,
} from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';

import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';

import api from '~/services/api';
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
  ModalContainer,
} from './styles';

export default function ProblemItem({ problem, updateProblems }) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  const isCancel = useMemo(() => {
    if (problem.delivery.status === 'CANCELED') {
      return true;
    }
    return false;
  }, [problem.delivery.status]);

  async function handleCancel() {
    if (!isCancel) {
      const cancelDelivery = async () => {
        try {
          await api.delete(`/delivery/${problem.id}/cancel-delivery`);
          updateProblems();
          toast.success(`Encomenda #${problem.id} foi cancelada com sucesso!`);
        } catch (err) {
          toast.error('Erro ao cancelars encomenda!');
        }
      };

      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <ConfirmAlert
              callback={() => cancelDelivery()}
              onClose={onClose}
              title="Deseja cancelar esta entrega?"
              iconTitle={MdEventBusy}
              message={
                <>
                  <p>
                    <strong>ID: </strong>
                    {problem.delivery.id}
                  </p>
                  <p>
                    <strong>Produto: </strong>
                    {problem.delivery.product}
                  </p>
                  <p>
                    Se confirmar, a entrega{' '}
                    <strong>#{problem.delivery.id}</strong> será cancelada
                    permanentemente. Deseja realmente cancelar?
                  </p>
                </>
              }
            />
          );
        },
      });
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <ConfirmAlert
              onlyConfirmButton
              confirmButtonText="Entendido"
              onClose={onClose}
              title="Entrega Cancelada"
              iconTitle={MdEventBusy}
              message={
                <>
                  <p>
                    <strong>ID: </strong>
                    {problem.delivery.id}
                  </p>
                  <p>
                    <strong>Produto: </strong>
                    {problem.delivery.product}
                  </p>
                  <p>
                    Esta entrega foi cancelada em{' '}
                    <strong>
                      {format(
                        parseISO(problem.delivery.canceled_at),
                        'dd/MM/yyyy'
                      )}
                    </strong>
                  </p>
                </>
              }
            />
          );
        },
      });
    }
  }

  return (
    <Container>
      <td data-label="Encomenda">
        <FirstItem>
          #{(problem.delivery_id < 10 ? '0' : null) + problem.delivery_id}
        </FirstItem>
      </td>
      <td data-label="Problema">
        <div>
          <p>{problem.description}</p>
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
                      zIndex: 200,
                    },
                    content: {
                      background: '#fff',
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
                    <strong>VISUALIZAR PROBLEMA</strong>
                    <span>{problem.description}</span>
                  </ModalContainer>
                </Modal>
              </Option>
              <LastOption>
                <Button
                  onClick={() => {
                    handleToggleVisible();
                    handleCancel();
                  }}
                >
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <p>
                    {isCancel
                      ? 'Encomenda cancelada. + Detalhe'
                      : 'Cancelar encomenda'}
                  </p>
                </Button>
              </LastOption>
            </OptionsList>
          </OptionsContainer>
        </LastItem>
      </td>
    </Container>
  );
}

ProblemItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  problem: PropTypes.object.isRequired,
  updateProblems: PropTypes.func.isRequired,
};
