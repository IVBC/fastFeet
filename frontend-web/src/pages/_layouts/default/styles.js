import styled from 'styled-components';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.bg};
  overflow: auto;
`;

export const Container = styled.div`
  max-width: 1366px;
  width: 100%;
  background: none;
  margin: 0 auto;
`;
