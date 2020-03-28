import styled from 'styled-components/native';

import { Form as Unform } from '@unform/mobile';
import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  /* padding: 20px; */
`;

export const Logo = styled.Image.attrs(() => ({
  source: logo,
}))`
  tint-color: ${colors.white};
  margin-bottom: 42px;
`;

export const Form = styled(Unform)`
  /* margin-top: 37px;
  align-self: stretch;
  background: red;
  background-color: red; */
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
  /* Aqui é so a cor */
  background: ${colors.green};
  align-self: stretch;
`;
