import styled from 'styled-components';
import InputMask from 'react-input-mask';
import colors from '~/styles/colors';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  flex: 1;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: ${colors.fontDark};
  text-align: left;
  margin-bottom: 9px;
  margin-left: 16px;
  display: flex;
`;

export const Error = styled.span`
  color: ${colors.red};
  align-self: flex-start;
  margin: 5px 0 0;
  font-weight: bold;
`;

export const ReactInputMask = styled(InputMask)`
  /* background: ${colors.bg}; */
  border: 1px solid ${colors.border};
  border-radius: 4px;
  height: 45px;
  padding: 0 15px;
  color: ${colors.fontDark};
  /* margin: 0 0 15px; */

`;
