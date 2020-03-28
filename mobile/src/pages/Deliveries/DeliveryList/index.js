import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function DeliveryList({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>DeliveryList!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Delivery')}
      />
    </View>
  );
}
