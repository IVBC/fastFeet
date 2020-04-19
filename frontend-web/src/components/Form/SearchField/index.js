import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function SearchField({ onChange, placeholder, ...rest }) {
  return (
    <Container>
      <div className="form__group">
        <input
          type="text"
          placeholder={`🔍  Buscar por ${placeholder}`}
          onChange={event => onChange(event)}
          id="name"
          {...rest}
        />
        <label htmlFor="name" className="form__label">
          {`🔍  Buscar por ${placeholder}`}
        </label>
      </div>
    </Container>
  );
}

export default memo(SearchField);

SearchField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
