import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export default styled.button`
  height: 45px;
  max-width: 300px;
  background: ${colors.primary};
  color: ${colors.second};
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  &:hover {
    background: ${darken(0.06, colors.primary)};
  }
`;
