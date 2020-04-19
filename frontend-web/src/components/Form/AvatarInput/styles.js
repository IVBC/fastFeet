import styled from 'styled-components';

import colors from '~/styles/colors';

export const Error = styled.span`
  color: ${colors.red};
  margin: 7px 0 0;
  font-weight: bold;
`;

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  label {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px solid ${colors.border};
      background: ${colors.bg};
    }
    input {
      display: none;
    }
  }
  .Shimmer-shimmer-0-1-1 {
    background-size: 800px 100%;
  }
`;

export const DefaultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px dashed ${colors.border};
  strong {
    color: ${colors.disabled};
  }
  &:hover {
    opacity: 0.8;
  }
`;
