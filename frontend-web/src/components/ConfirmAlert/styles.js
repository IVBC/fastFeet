import styled, { css } from 'styled-components';

import colors from '~/styles/colors';

export const Card = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  background: ${colors.bg};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;

  p {
    font-size: 18px;
    margin-bottom: 20px;
    strong {
      color: ${colors.fontDark};
    }
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-top: 20px;
    > div {
      margin-right: 0;
    }
    ${props =>
      props.onlyConfirmButton &&
      css`
        width: 100%;
      `}
  }
  button + button {
    ${props =>
      !props.onlyConfirmButton &&
      css`
        margin-left: 10px;
      `}
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  margin-bottom: 16px;

  > svg {
    font-size: 52px;
  }
`;
