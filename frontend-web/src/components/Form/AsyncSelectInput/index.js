import React, { useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import { useField } from '@unform/core';

import { Label as StyledLabel, Container, Error } from './styles';

const AsyncSelect = ({ name, label, disabled, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [defaultValue, fieldName, registerField, rest.isMulti]);
  return (
    <Container>
      {label && <StyledLabel htmlFor={fieldName}>{label}</StyledLabel>}
      <Select
        id={fieldName}
        cacheOptions
        defaultValue={defaultValue}
        defaultOptions
        ref={selectRef}
        className={error ? 'has-error' : ''}
        classNamePrefix="react-select"
        placeholder=""
        isDisabled={disabled}
        {...rest}
      />
      {error && <Error className="error">{error}</Error>}
    </Container>
  );
};
export default memo(AsyncSelect);

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

AsyncSelect.defaultProps = {
  label: null,
  disabled: null,
};
