import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import colors from '~/styles/colors';
import { Container, Text } from './styles';

export default function Button({
  children,
  background,
  loading,
  disabled,
  ...rest
}) {
  return (
    <Container
      {...rest}
      enabled={!disabled || !loading}
      background={background}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  background: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
  background: colors.primary,
  disabled: false,
};
