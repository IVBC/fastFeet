import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import PropTypes from 'prop-types';

import history from '~/services/history';

import ButtonWithIcon from '../_ButtonWithIcon';

import colors from '~/styles/colors';

export default function BackButton({ loading }) {
  return (
    <ButtonWithIcon
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background={colors.grey}
      loading={loading}
    />
  );
}

BackButton.propTypes = {
  loading: PropTypes.bool,
};

BackButton.defaultProps = {
  loading: false,
};
