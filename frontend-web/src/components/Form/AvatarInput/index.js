import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';
import PropTypes from 'prop-types';
import { MdInsertPhoto } from 'react-icons/md';

import api from '~/services/api';

import { Container, DefaultContent, Error } from './styles';

export default function AvatarInput({ setErrorFor, isLoading, ...rest }) {
  const { defaultValue, registerField, error } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [loading, setLoading] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (defaultValue) {
      setFile(defaultValue.id);
      setPreview(defaultValue.url);
    }
  }, [defaultValue]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    try {
      setLoading(true);
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
      setErrorFor('avatar', null);
    } catch (err) {
      toast.error('Falha ao enviar a imagem, por favor, tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  function Isloading() {
    let ans;
    if (loading) {
      ans = (
        <Shimmer>
          <DefaultContent />
        </Shimmer>
      );
    } else {
      ans = preview ? (
        <img src={preview} alt="preview" />
      ) : (
        <DefaultContent>
          <MdInsertPhoto size={40} color="#dddddd" />
          <strong>Adicionar foto</strong>
        </DefaultContent>
      );
    }
    return ans;
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {/* {preview ? (
          <img src={preview} alt="preview" />
        ) : (
          <DefaultContent>
            <MdInsertPhoto size={40} color="#dddddd" />
            <strong>Adicionar foto</strong>
          </DefaultContent>
        )} */}

        <Isloading />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
          {...rest}
        />
        {error && <Error className="error">{error}</Error>}
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  setErrorFor: PropTypes.func.isRequired,
  isLoading: PropTypes.func,
};

AvatarInput.defaultProps = {
  isLoading: false,
};
