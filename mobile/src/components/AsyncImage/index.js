import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

import { Container, Image } from './styles';
import DefaultAvatar from '../DefaultAvatar';

function AsyncImage({ style, source, name, size }) {
  console.log('AsyncImage');
  console.log(source);
  const [loaded, setLoaded] = useState(false);
  function onLoad() {
    if (source !== null) {
      setLoaded(true);
    }
  }

  return (
    <Container style={style}>
      <Image
        source={{ uri: source }}
        resizeMode="contain"
        style={[
          style,
          {
            // position: 'absolute',
            resizeMode: 'contain',
            display: !loaded ? 'none' : 'flex',
          },
        ]}
        onLoad={onLoad}
      />

      {!loaded && <DefaultAvatar name={name} size={size} />}
    </Container>
  );
}

export default memo(AsyncImage);

AsyncImage.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  source: PropTypes.string,
};

AsyncImage.defaultProps = {
  style: {},
  source: null,
  name: null,
};
