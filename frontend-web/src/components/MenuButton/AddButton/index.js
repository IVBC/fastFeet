import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function AddButton({ onClick, ...rest }) {
  return (
    <Container>
      <button type="button" onClick={() => onClick()} {...rest}>
        <MdAdd color="#fff" size={22} />
        <strong>Cadastrar</strong>
      </button>
    </Container>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
