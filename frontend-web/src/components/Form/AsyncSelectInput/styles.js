import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 30px;
`;

export const Label = styled.label`
  color: ${colors.fontDark};
  font-weight: bold;
  text-align: left;
  margin-bottom: 9px;
`;

export const Error = styled.span`
  color: ${colors.red};
  margin: 5px 0 0;
`;
