import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function DeliveryDetail({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>DeliveryDetail!</Text>
      <Button
        title="Informar Problema"
        onPress={() => navigation.navigate('ProblemForm')}
      />
    </View>
  );
}
