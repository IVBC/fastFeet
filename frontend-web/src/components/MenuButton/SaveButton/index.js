import React from 'react';
import { MdDone } from 'react-icons/md';

import PropTypes from 'prop-types';

import ButtonWithIcon from '../_ButtonWithIcon';

export default function SaveButton({ action, loading }) {
  return (
    <ButtonWithIcon
      title="SALVAR"
      loading={loading}
      Icon={MdDone}
      action={action}
    />
  );
}

SaveButton.propTypes = {
  action: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SaveButton.defaultProps = {
  loading: false,
};
