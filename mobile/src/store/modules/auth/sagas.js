import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/deliverers/${id}`);

    const { data: user } = response;

    if (!user) {
      Alert.alert('Erro no login', 'O ID é inválido.');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(id, user));
  } catch (err) {
    Alert.alert('Falha na autenticação', 'ID invalido');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
