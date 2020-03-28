import styled from 'styled-components/native';

export const Container = styled.View`
  /* width: 100%;
  max-width: 540px; */
  height: 52px;
  background: #fff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  /* margin-top: 20px;
  margin-bottom: 20px; */
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
  margin: 5px 0 0;
  font-weight: bold;
`;
