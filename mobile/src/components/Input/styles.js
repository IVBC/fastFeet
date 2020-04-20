import styled from 'styled-components/native';

export const Container = styled.View`
  height: 52px;
  background: #fff;
  border-radius: 4px;
  width: 100%;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  font-size: 18px;

  color: #999999;
  padding: 10px 20px;
`;

export const TextError = styled.Text`
  color: rgba(255, 0, 0, 0.7);
  align-self: flex-start;
  margin: 5px 20px 0;
  font-weight: bold;
`;
