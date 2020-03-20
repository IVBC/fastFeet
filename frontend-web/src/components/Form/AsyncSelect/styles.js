import styled from 'styled-components';

import colors from '~/styles/colors';

export const Label = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: ${colors.label};
  text-align: left;
  margin-bottom: 10px;
  display: flex;
`;

export const Container = styled.div`
  & > div > div:nth-child(1),
  & > div > div:nth-child(2) {
    border-radius: 4px;
    padding: 0 15px;
    color: ${colors.dark};
    width: 100%;
    height: 45px;

    div:first-child {
      height: 45px;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: flex-start;
      padding: 0;

      div {
        display: flex;
        height: 45px;
        padding: 0;
      }

      > div {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
    }

    &::placeholder {
      color: ${colors.grey};
      height: 19px;
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 19px;
    }
  }
`;

export const Error = styled.span`
  color: ${colors.red};
`;
