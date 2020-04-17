import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdClose, MdDeleteSweep } from 'react-icons/md';

import { Card, Header } from './styles';

import colors from '~/styles/colors';

import Button from '~/components/Button';

export default function ConfirmAlert({
  callback,
  onClose,
  title,
  message,
  onlyConfirmButton,
  confirmButtonText,
  iconTitle,
  cancelButtonText,
  showButtons,
}) {
  return (
    <Card onlyConfirmButton={onlyConfirmButton}>
      <Header>
        <h1>{title}</h1>
        {iconTitle()}
      </Header>

      {typeof message === 'object' ? message : <p>{message}</p>}

      {showButtons && (
        <div>
          {!onlyConfirmButton && (
            <Button
              type="button"
              onClick={onClose}
              icon={MdClose}
              text={cancelButtonText}
              color={colors.grey}
            />
          )}

          <Button
            type="button"
            text={confirmButtonText}
            icon={MdCheck}
            onClick={() => {
              if (callback) callback();

              onClose();
            }}
          />
        </div>
      )}
    </Card>
  );
}

ConfirmAlert.propTypes = {
  callback: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  iconTitle: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onlyConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  showButtons: PropTypes.bool,
};

ConfirmAlert.defaultProps = {
  callback: null,
  title: 'Você está certo disso?',
  message: 'Você deseja confirmar esta ação?',
  onlyConfirmButton: false,
  confirmButtonText: 'SIM',
  cancelButtonText: 'NÃO',
  showButtons: true,
};
