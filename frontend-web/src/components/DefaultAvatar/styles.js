import styled from 'styled-components';

export const Container = styled.span`
  border-radius: 50%;
  margin-right: 5px;
  font-size: ${props => `${props.size / 2}px`};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background: ${props => props.background};
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${props => props.color};
`;
