import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '~/styles/colors';
import HeaderLeft from '~/components/HeaderLeft';

import Dashboard from '~/pages/Dashboard';

import DeliveryDetail from '~/pages/DeliveryDetail';

import { ProblemForm, ProblemList } from '~/pages/DeliveryDetail/Problems';

import DeliverConfirm from '~/pages/DeliveryDetail/DeliveryConfirm';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerTintColor: colors.bg,
        headerTransparent: true,
        headerLeft: () => <HeaderLeft />,
      }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen
        name="Delivery"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={DeliveryDetail}
      />
      <Stack.Screen
        name="ProblemForm"
        options={{
          title: 'Informar Problema',
        }}
        component={ProblemForm}
      />
      <Stack.Screen
        name="ProblemsList"
        options={{
          title: 'Visualizar Problemas',
        }}
        component={ProblemList}
      />
      <Stack.Screen
        name="DeliverConfirm"
        options={{
          title: 'Confirmar entrega',
        }}
        component={DeliverConfirm}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
      />
    </Stack.Navigator>
  );
}
