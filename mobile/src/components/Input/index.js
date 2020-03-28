import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { useField } from '@unform/core';

import { Container, TInput, TextError } from './styles';

export default function Input({ name, label, style, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style}>
      {label && <Text>{label}</Text>}

      <TInput {...rest} ref={inputRef} defaultValue={defaultValue} />

      {error && <TextError>{error}</TextError>}
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  label: null,
};
