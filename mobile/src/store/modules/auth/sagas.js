import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    if (id === '') {
      Alert.alert('Falha na autenticação', 'Informe o ID.');
      yield put(signFailure());
      return;
    }
    const response = yield call(api.get, `/deliverers/${id}`);

    const { data: user } = response;

    yield put(signInSuccess(id, user));
  } catch (err) {
    if (err.response) {
      const codeErro = err.response.status;
      if (codeErro === 401) {
        Alert.alert('Sentimos muito :(', 'Vocế está demitido.');
      } else {
        Alert.alert('Falha na autenticação', 'O ID é inválido.');
      }
    } else {
      Alert.alert(
        'Falha na autenticação',
        'Falha na comunicação com o servidor'
      );
    }
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
