import styled from 'styled-components';

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  flex: 1;

  strong {
    color: #444;
    font-weight: bold;
    text-align: left;
    margin-bottom: 9px;
  }

  input {
    display: flex;

    height: 45px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    font-size: 16px;
    color: #444;
    padding-left: 15px;
  }

  span {
    color: rgba(255, 0, 0, 0.7);
    align-self: flex-start;
    margin: 5px 0 0;
    font-weight: bold;
  }
`;
