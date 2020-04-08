import React, { useCallback, useMemo, useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import {
  Container,
  Card,
  Avatar,
  Label,
  TextValue,
  LogoutButton,
  Content,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  const [avatarImageUrl, setAvatarImageUrl] = useState();

  const formatedCreatedAt = useMemo(
    () =>
      user &&
      format(new Date(user.createdAt), "dd'/'MM'/'y", {
        locale: pt,
      }),
    [user]
  );

  useEffect(() => {
    if (user && user.avatar.url) {
      setAvatarImageUrl(user.avatar.url);
    } else {
      setAvatarImageUrl(
        'https://api.adorable.io/avatars/50/abott@adorable.png'
      );
    }
  }, [user]);

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <Content>
        <Avatar
          source={{
            uri: avatarImageUrl,
          }}
          onError={() =>
            setAvatarImageUrl(
              'https://api.adorable.io/avatars/50/abott@adorable.png'
            )
          }
        />
        <Card>
          <Label>Nome</Label>
          <TextValue>{user && user.name}</TextValue>
          <Label>Email</Label>
          <TextValue>{user && user.email}</TextValue>
          <Label>Data de cadastro</Label>
          <TextValue>{formatedCreatedAt}</TextValue>
          <LogoutButton onPress={handleLogOut}>Logout</LogoutButton>
        </Card>
      </Content>
    </Container>
  );
}

export default memo(Profile);
