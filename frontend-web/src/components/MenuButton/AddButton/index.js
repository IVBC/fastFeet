import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

import colors from '~/styles/colors';

function AddButton({ onClick, ...rest }) {
  return (
    <Container>
      <button type="button" onClick={() => onClick()} {...rest}>
        <MdAdd color={colors.second} size={22} />
        <strong>Cadastrar</strong>
      </button>
    </Container>
  );
}

export default memo(AddButton);

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
