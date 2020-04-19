import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  button {
    display: flex;
    padding-left: 21px;
    padding-right: 16px;
    align-items: center;
    height: 36px;
    background: ${colors.primary};
    color: ${colors.second};
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.06, colors.primary)};
    }
    svg {
      margin-right: 4px;
    }
    strong {
      color: ${colors.second};
      font-size: 14px;
      margin: 0 5px 0 0;
    }
  }
`;
