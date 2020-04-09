import React, { useEffect, useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View, Alert } from 'react-native';

import List from './List';

import colors from '~/styles/colors';

import {
  Container,
  ProfileContainer,
  ProfileContent,
  Welcome,
  UserName,
  SignOutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import AsyncImage from '~/components/AsyncImage';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.profile);

  const [avatarImageUrl, setAvatarImageUrl] = useState();

  const handleLogOut = useCallback(() => {
    Alert.alert(
      'Atenção',
      'Deseja realmente sair da aplicação?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => dispatch(signOut()) },
      ],
      { cancelable: false }
    );
  }, [dispatch]);

  useEffect(() => {
    if (user?.avatar.url) {
      setAvatarImageUrl(user.avatar.url);
    }
  }, [user]);

  return (
    <Container>
      <ProfileContainer>
        <ProfileContent>
          <AsyncImage name={user?.name} size={70} source={avatarImageUrl} />
          <View>
            <Welcome>Bem vindo de volta,</Welcome>
            <UserName>{user?.name}</UserName>
          </View>
        </ProfileContent>
        <SignOutButton onPress={handleLogOut}>
          <Icon name="exit-to-app" size={34} color={colors.red} />
        </SignOutButton>
      </ProfileContainer>
      <List />
    </Container>
  );
}
