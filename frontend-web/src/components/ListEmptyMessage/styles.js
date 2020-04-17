import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  background-color: transparent;
  > svg {
    font-size: 60px;
    color: #999;
  }
`;

export const Text = styled.span`
  color: ${colors.grey};
  font-weight: bold;
  font-size: 22px;
  text-align: center;
`;
