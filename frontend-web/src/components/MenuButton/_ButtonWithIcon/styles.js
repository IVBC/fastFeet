import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export default styled.button`
  padding: 0 16px;
  height: 36px;

  font-size: 14px;
  font-weight: bold;

  color: #fff;
  border: 0;
  border-radius: 4px;

  background: ${props => props.background || colors.primary};

  display: flex;
  text-align: center;
  align-items: center;
  &:hover {
    background: ${props => darken(0.06, props.background || colors.primary)};
  }

  svg {
    margin-right: 7px;
  }
`;
