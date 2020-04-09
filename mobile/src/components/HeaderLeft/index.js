import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import { Button } from './styles';

export default function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={28} color="#FFF" />
    </Button>
  );
}
