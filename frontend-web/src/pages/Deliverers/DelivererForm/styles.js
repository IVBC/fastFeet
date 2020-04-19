import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  max-width: 1000px;
  margin: auto;
`;

export const InitialContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  strong {
    font-size: 24px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  button {
    margin: 10px 10px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  background: ${colors.second};
  border-radius: 4px;
  form {
    flex: 1;
    margin-left: 31px;
    margin-right: 31px;
    margin-bottom: 40px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
`;
