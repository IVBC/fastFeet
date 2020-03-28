import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 50px;
  margin-right: 20px;

  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background: ${(props) => props.background};
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.color};
`;

export const Text = styled.Text`
  font-size: ${(props) => `${props.size / 2}px`};
`;
