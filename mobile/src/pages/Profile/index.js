import React, { useCallback, useMemo, useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import AsyncImage from '~/components/AsyncImage';

import {
  Container,
  Content,
  ProfileImage,
  Card,
  Label,
  Text,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

function Profile() {
  const user = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  const [avatarURL, setAvatarURL] = useState();

  useEffect(() => {
    if (user?.avatar.url) {
      setAvatarURL(user.avatar.url);
    }
  }, [user]);

  const formatedCreatedAt = useMemo(
    () =>
      user &&
      format(new Date(user.createdAt), "dd'/'MM'/'y", {
        locale: pt,
      }),
    [user]
  );

  const handleLogout = useCallback(() => {
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

  return (
    <Container>
      <Content>
        <ProfileImage>
          <AsyncImage name={user?.name} size={200} source={avatarURL} />
        </ProfileImage>

        <Card>
          <Label>Nome completo</Label>
          <Text>{user && user.name}</Text>
          <Label>Email</Label>
          <Text>{user && user.email}</Text>
          <Label>Data de cadastro</Label>
          <Text>{formatedCreatedAt}</Text>
          <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
        </Card>
      </Content>
    </Container>
  );
}

export default memo(Profile);
