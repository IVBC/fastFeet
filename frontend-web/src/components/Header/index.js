import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import {
  Container,
  Content,
  NavBar,
  Profile,
  MenuToggle,
  MenuOne,
  MenuTwo,
  MenuThree,
} from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container on={showMenu ? 1 : 0}>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavBar
            onClick={() => {
              setShowMenu(false);
            }}
          >
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

        <MenuToggle onClick={handleShowMenu}>
          <MenuOne />
          <MenuTwo />
          <MenuThree />
        </MenuToggle>
      </Content>
    </Container>
  );
}
