import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  button {
    display: flex;
    padding-left: 21px;
    padding-right: 16px;
    align-items: center;
    height: 36px;
    background: #7d40e7;
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.06, '#7d40e7')};
    }
    svg {
      margin-right: 4px;
    }
    strong {
      color: #fff;
      font-size: 14px;
      margin: 0 5px 0 0;
    }
  }
`;
