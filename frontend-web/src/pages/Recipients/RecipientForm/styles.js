import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 27px;
  margin-left: 270px;
  margin-right: 270px;
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
  form {
    flex: 1;
    margin-left: 15px;
    margin-right: 31px;
    margin-bottom: 37px;
    margin-top: 26px;
    input {
      margin-left: 16px;
    }
    strong {
      margin-left: 16px;
    }
    div {
      display: flex;
    }
    span {
      width: 60%;
    }
  }
`;
