import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';

import { Error, Label as StyledLabel, ReactInputMask, Content } from './styles';

const InputMask = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, _value) {
        ref.setInputValue(_value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <Content>
      {label && <StyledLabel htmlFor={fieldName}>{label}</StyledLabel>}
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Error className="error">{error}</Error>}
    </Content>
  );
};
export default InputMask;

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputMask.defaultProps = {
  label: null,
};
