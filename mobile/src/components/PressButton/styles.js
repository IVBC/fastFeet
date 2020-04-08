import styled from 'styled-components/native';

export const Button = styled.View`
  padding: 20px;
  border-width: 3px;
  border-color: transparent;
`;

export const ContentButton = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextError = styled.Text`
  font-size: 10px;
  color: rgba(255, 0, 0, 0.7);
  align-self: center;
  /* margin: 5px 20px 5px; */
  font-weight: bold;
  position: absolute;
  top: -15px;
  /* left: 0; */
`;

export const bgFill = {
  position: 'absolute',
  top: 0,
  left: 0,
};
