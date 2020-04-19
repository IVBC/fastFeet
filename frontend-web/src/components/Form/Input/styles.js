import styled from 'styled-components';

import colors from '~/styles/colors';

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
    border: 1px solid ${colors.border};
    font-size: 16px;
    color: ${colors.fontDark};
    padding-left: 15px;
  }

  input:disabled {
    background-color: #f5f5f5;
  }

  span {
    color: ${colors.red};
    align-self: flex-start;
    margin: 5px 0 0;
    font-weight: bold;
  }
`;
