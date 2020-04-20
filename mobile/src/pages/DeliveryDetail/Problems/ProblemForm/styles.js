import styled from 'styled-components/native';
import { Form as UnForm } from '@unform/mobile';
import UnformInput from '~/components/Input';
import Button from '~/components/Button';

import colors from '~/styles/colors';

export const FormContent = styled.View`
  margin-top: 25px;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`;

export const Form = styled(UnForm)`
  flex: 1;
  align-items: center;
`;

export const Input = styled(UnformInput)`
  align-items: flex-start;
  padding: 12px 0;
  height: 70%;
  border: 1px solid ${colors.border};
  elevation: 3;
`;

export const SubmitButton = styled(Button)`
  margin-top: 30px;
  width: 100%;
`;
