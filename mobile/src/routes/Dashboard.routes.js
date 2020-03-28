import React from 'react';
import { StatusBar } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '~/components/TabBar';

import Profile from '~/pages/Profile';
import DeliveriesRoutes from '~/routes/Deliveries.routes';
import colors from '~/styles/colors';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name="Deliveries"
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: 'view-headline',
          }}
          component={DeliveriesRoutes}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Meu perfil',
            tabBarIcon: 'account-circle',
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}
