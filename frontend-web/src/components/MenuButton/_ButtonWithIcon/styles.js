import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export default styled.button`
  padding: 0 16px;
  height: 36px;

  font-size: 14px;
  font-weight: bold;

  color: ${colors.second};
  border: 0;
  border-radius: 4px;

  background: ${props => props.background || colors.primary};

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${props => darken(0.06, props.background || colors.primary)};
  }

  span {
    margin-left: 7px;
  }

  div {
    margin: 0 21px;
  }
`;
