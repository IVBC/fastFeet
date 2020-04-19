import styled from 'styled-components';
import colors from '~/styles/colors';

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
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  button {
    margin: 10px 10px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: center;
  background: ${colors.second};
  border-radius: 4px;
  > form {
    flex: 1;
    flex-wrap: wrap;
    margin-left: 15px;
    margin-bottom: 37px;
    margin-top: 10px;
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
      flex: 1;
      flex-wrap: wrap;
      > div {
        flex: 1;
        min-width: 300px;
        margin-top: 16px;
      }
    }
  }
`;
