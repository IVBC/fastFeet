import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

const INITIAL_STATE = {
  id: null,
  signed: false,
  loading: false,
};

const auth = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.id;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.signed = false;
        break;
      }
      case '@auth/SET_LOADING': {
        draft.loading = action.payload;
        break;
      }
      default:
    }
  });
};

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loading'],
};

export default persistReducer(persistConfig, auth);
