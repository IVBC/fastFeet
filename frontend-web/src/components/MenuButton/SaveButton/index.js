import React from 'react';
import { MdDone } from 'react-icons/md';

import PropTypes from 'prop-types';

import ButtonWithIcon from '../_ButtonWithIcon';

export default function SaveButton({ action }) {
  return <ButtonWithIcon title="SALVAR" Icon={MdDone} action={action} />;
}

SaveButton.propTypes = {
  action: PropTypes.func.isRequired,
};
