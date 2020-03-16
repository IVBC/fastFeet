import styled from 'styled-components';
import { darken } from 'polished';

export default styled.button`
  background: #7d40e7;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  border-radius: 4px;
  max-width: 300px;
  border: none;
  &:hover {
    background: ${darken(0.06, '#7d40e7')};
  }
`;
