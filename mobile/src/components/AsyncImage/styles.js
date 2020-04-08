import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
`;

export const Image = styled.Image`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  border-radius: ${(props) => `${props.size / 2}px`};
  margin-right: 20px;
`;
