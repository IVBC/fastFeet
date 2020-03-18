import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, NavBar, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavBar>
            <NavLink to="/deliveries">ENCOMENDAS</NavLink>
            <NavLink to="/deliverers">ENTREGADORES</NavLink>
            <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
            <NavLink to="/problems">PROBLEMAS</NavLink>
          </NavBar>
        </nav>
        <Profile>
          <strong>{profile.name}</strong>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
