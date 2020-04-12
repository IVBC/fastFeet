import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Alert } from 'react-native';

import { signOut } from '~/store/modules/auth/actions';
import AsyncImage from '~/components/AsyncImage';
import ListDelivery from './ListDelivery';

import {
  Container,
  ProfileContainer,
  ProfileContent,
  TitleWelcome,
  UserName,
  SignOutButton,
} from './styles';

import colors from '~/styles/colors';

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
            <TitleWelcome>Bem vindo de volta,</TitleWelcome>
            <UserName>{user?.name}</UserName>
          </View>
        </ProfileContent>
        <SignOutButton onPress={handleLogOut}>
          <Icon name="exit-to-app" size={34} color={colors.red} />
        </SignOutButton>
      </ProfileContainer>
      <ListDelivery />
    </Container>
  );
}
