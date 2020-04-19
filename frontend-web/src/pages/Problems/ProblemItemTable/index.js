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
} from './styles';

export default function ProblemItem({ problem, updateProblems }) {
  const [modalOpen, setModalOpen] = useState(false);

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
        // eslint-disable-next-line react/prop-types
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
        // eslint-disable-next-line react/prop-types
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
            <Badge>
              <MdMoreHoriz color={colors.grey} size={25} />
            </Badge>
            <OptionsList>
              <Option>
                <Button
                  onClick={() => {
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
                    <strong>VISUALIZAR PROBLEMA</strong>
                    <span>{problem.description}</span>
                  </ModalContainer>
                </Modal>
              </Option>
              <LastOption>
                <Button
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  <MdDeleteForever color={colors.red} size={16} />
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
  problem: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    delivery_id: PropTypes.number,
    delivery: PropTypes.shape({
      id: PropTypes.number,
      product: PropTypes.string,
      canceled_at: PropTypes.string,
      status: PropTypes.string,
    }),
  }).isRequired,
  updateProblems: PropTypes.func.isRequired,
};
