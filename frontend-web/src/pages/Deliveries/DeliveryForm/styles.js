import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  justify-content: center;
  margin-top: 27px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 10px;
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
  align-items: center;
  button {
    margin-left: 16px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  margin-top: 27px;
  justify-content: center;
  background: #fff;
  border-radius: 4px;
  > form {
    flex: 1;
    margin-left: 15px;
    margin-bottom: 37px;
    margin-top: 26px;
    padding-left: 16px;
    > span {
      display: flex;
      margin-top: 16px;
      margin-right: 30px;
      span {
        font-weight: normal;
      }
    }
    > aside {
      display: flex;
    }
  }
`;
