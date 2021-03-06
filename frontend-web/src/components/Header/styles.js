import styled, { css } from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const NavBar = styled.div`
  border-left: 1px solid ${colors.border};
  padding-left: 30px;
  height: 32px;
  display: flex;
  align-items: center;
  a {
    margin-right: 20px;
    font-size: 1.6rem;
    font-weight: bold;
    color: ${colors.fontLigh};
    &.active {
      color: ${colors.fontDark};
    }
  }
  @media (max-width: 890px) {
    display: none;
  }
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

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    text-align: right;
    color: ${colors.fontColor};
    margin-bottom: 5px;
  }
  button {
    background: none;
    border: none;
    color: ${colors.red};
    text-align: end;

    &:hover {
      color: ${darken(0.15, colors.red)};
    }
  }

  @media (max-width: 890px) {
    display: none;
  }
`;

export const MenuToggle = styled.div`
  width: 40px;
  height: 30px;

  @media (min-width: 890px) {
    display: none;
  }
`;
export const MenuOne = styled.div`
  background-color: ${colors.fontColor};
  height: 5px;
  width: 100%;
  margin: 6px auto;
  transition-duration: 0.3s;
`;
export const MenuTwo = styled.div`
  background-color: ${colors.fontColor};
  height: 5px;
  width: 100%;
  margin: 6px auto;
  transition-duration: 0.3s;
`;
export const MenuThree = styled.div`
  background-color: ${colors.fontColor};
  height: 5px;
  width: 100%;
  margin: 6px auto;
  transition-duration: 0.3s;
`;

export const Container = styled.div`
  background: ${colors.second};
  border: 1px solid ${colors.border};
  padding: 0 30px;
  ${({ on }) =>
    on &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: ${colors.bg};
      z-index: 10;
      & ${NavBar} {
        display: flex;
        flex-direction: column;
        border-left: 0 solid ${colors.border};

        /* background-color: red; */

        a {
          transition-duration: 0.5s;
          font-size: 3rem;
          line-height: 6rem;
          display: block;
        }
      }

      & ${Profile} {
        display: flex;
        button {
          text-align: center;
        }
      }

      & ${Content} {
        justify-content: space-around;
        height: 100%;
        flex-direction: column;
        nav {
          flex-direction: column;
          img {
            padding: 0;
            margin-bottom: 40px;
          }
        }
      }
      & ${MenuToggle} {
        position: absolute;
        top: 17px;
        right: 29px;
      }

      & ${MenuOne} {
        transform: rotate(45deg) translate(7px, 7px);
      }
      & ${MenuTwo} {
        opacity: 0;
      }
      & ${MenuThree} {
        transform: rotate(-45deg) translate(8px, -9px);
      }
    `}
`;
