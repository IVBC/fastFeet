import React from 'react';
import 'react-native-gesture-handler';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

import colors from '~/styles/colors';

export default function Index() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />
          <App />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
