import React from 'react';

import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

import Button from './styles';

import colors from '~/styles/colors';

export default function IconButton({
  title,
  Icon,
  action,
  background,
  loading,
  ...rest
}) {
  return (
    <Button onClick={action} background={background} {...rest}>
      {loading ? (
        <ReactLoading
          type="bars"
          height={36}
          width={36}
          color={colors.second}
        />
      ) : (
        <>
          <Icon color={colors.second} size={16} />
          <span>{title}</span>
        </>
      )}
    </Button>
  );
}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  background: PropTypes.string,
  loading: PropTypes.bool,
};

IconButton.defaultProps = {
  background: '',
  loading: false,
};
