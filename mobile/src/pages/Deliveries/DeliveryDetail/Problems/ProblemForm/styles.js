// import styled from 'styled-components/native';
// import Input from '~/components/Input';
// import Button from '~/components/Button';

// export const Container = styled.View`
//   background: #fff;
//   flex: 1;
// `;

// export const Background = styled.View`
//   background: #7d40e7;
//   height: 155px;
// `;

// export const Content = styled.View`
//   margin-top: -63px;
//   padding-left: 20px;
//   padding-right: 20px;
// `;

// // export const ProblemInput = styled(Input)`
// //   height: 300px;
// //   border: 1px #0000001a;
// //   display: flex;
// //   align-items: flex-start;
// // `;

// export const SubmitButton = styled(Button)`
//   margin-top: 20px;
// `;

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
