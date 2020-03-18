import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  border: 1px solid #dddddd;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    align-items: center;
    img {
      width: 135px;
      height: 26px;
      padding-right: 30px;
    }
  }
`;

export const NavBar = styled.div`
  border-left: 1px solid #ddd;
  padding-left: 30px;
  height: 32px;
  display: flex;
  align-items: center;
  a {
    margin-right: 20px;
    font-size: 15px;
    font-weight: bold;
    color: #999;
    &.active {
      color: #444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    text-align: right;
    color: #666666;
    margin-bottom: 5px;
  }
  button {
    background: none;
    border: none;
    color: #de3b3b;
    text-align: end;

    &:hover {
      color: ${darken(0.15, '#de3b3b')};
    }
  }
`;
