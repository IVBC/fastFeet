import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.tr`
  td {
    div {
      height: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 57px;
      font-size: 1.4rem;
      font-weight: 100;
      background: ${colors.second};
      margin-bottom: 16px;
      color: ${colors.fontColor};
      display: flex;
      align-items: center;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 40px;

        @media (min-width: 1100px) {
          width: 1000px;
        }
        @media (max-width: 1100px) and (min-width: 890px) {
          width: 700px !important;
        }
      }
    }
  }
`;

export const FirstItem = styled.div`
  padding-left: 23px;
  height: 57px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const LastItem = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  background: ${colors.second};
  height: 46px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Button = styled.button`
  background: none;
  border: 0;
  position: relative;
  align-self: center;
  display: flex;
  flex: 1;
  &:hover {
    background: ${darken(0.02, colors.second)};
  }
`;

export const OptionsList = styled.span`
  position: absolute;
  z-index: 99;
  width: 200px;
  left: calc(50% - 164px);
  top: 100%;
  background: ${colors.second};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
  &::before {
    content: '▲';
    position: absolute;
    left: 158px;
    top: -13px;
    width: 0;
    height: 0;
    color: ${colors.second};
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.25);
  }
`;

export const Badge = styled.button`
  padding: 10px 28px;
  background: none;
  border: 0;
  position: relative;
  align-content: center;
  &:hover {
    background: ${darken(0.02, colors.second)};
  }
`;

export const Option = styled.span`
  display: flex;
  align-content: center;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 1px solid #eeeeee;
  svg {
    margin-bottom: 6px;
    margin-top: 6px;
  }
  p {
    font-size: 15px;
    margin-left: 14px;
    font-weight: lighter;
    color: ${colors.fontLigh};
    margin-bottom: 6px;
    margin-top: 6px;
  }
`;

export const LastOption = styled.span`
  display: flex;
  align-content: center;
  margin-left: 10px;
  margin-right: 10px;
  svg {
    margin-bottom: 6px;
    margin-top: 6px;
  }
  p {
    font-size: 15px;
    margin-left: 14px;
    font-weight: lighter;
    color: ${colors.fontLigh};
    margin-bottom: 6px;
    margin-top: 6px;
    text-align: left;
  }
`;

export const OptionsContainer = styled.span`
  position: relative;
  & ${Badge}:hover + ${OptionsList} {
    display: block;
  }
  & ${OptionsList}:hover {
    display: block;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  strong {
    font-size: 14px;
    color: ${colors.fontDark};
  }
  span {
    word-break: break-word;
    display: flex;
    text-align: justify;
    margin-top: 8px;
    font-size: 16px;
    color: ${colors.fontLigh};
  }
`;
