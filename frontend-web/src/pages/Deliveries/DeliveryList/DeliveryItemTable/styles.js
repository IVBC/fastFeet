import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.tr`
  td {
    div {
      height: 57px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 57px;
      font-size: 1.4rem;
      font-weight: 100;
      background: #fff;
      margin-bottom: 21px;
      color: #666666;
      display: flex;
      align-items: center;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 40px;
      }
      img {
        border-radius: 50%;
        margin-right: 5px;
        width: 35px;
        height: 35px;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: fit-content;
        height: 25px;
        border-radius: 14px;
        background: ${props => props.statusBackground};
        font-size: 14px;
        @media (max-width: 1199.98px) and (min-width: 890px) {
          font-size: 10px;
        }

        margin-top: 14px;
        @media (max-width: 890px) {
          margin-top: 0;
        }
        strong {
          color: ${props => props.statusColor};
          margin-right: 10px;
          @media (max-width: 950px) {
            margin-left: 5px;
          }
        }
        div {
          margin: 6px 6px;
          background: ${props => props.statusColor};
          width: 10px;
          height: 10px;

          @media (max-width: 950.98px) {
            margin: 0px 0px 2px 5px;
          }
        }
      }
    }
  }
`;

export const FirstItem = styled.div`
  padding-left: 13px;
  height: 57px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const LastItem = styled.span`
  display: flex;
  justify-content: center;
  margin-bottom: 21px;
  background: #fff;
  height: 57px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  > span {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

export const Button = styled.button`
  background: none;
  border: 0;
  position: relative;
  align-self: center;
  display: flex;
  flex: 1;
  &:hover {
    background: ${darken(0.02, '#fff')};
  }
`;

export const OptionsList = styled.span`
  position: absolute;
  z-index: 100;
  width: 150px;
  /* left: calc(50% - 73px); */
  top: 100%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
  &::before {
    content: '▲';
    position: absolute;
    left: 114px;
    top: -13px;
    width: 0;
    height: 0;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.25);
  }
`;

export const Badge = styled.button`
  padding: 10px 16px;
  background: ${props => (props.visible ? darken(0.07, '#fff') : 'none')};
  border-radius: ${props => (props.visible ? `${10}px` : 'none')};
  border: 0;
  box-shadow: ${props =>
    props.visible ? 'inset 0px 0px 2px 0px rgba(0,0,0,0.25)' : null};
  position: relative;
  align-content: center;
  &:hover {
    background: ${props => !props.visible && darken(0.02, '#fff')};
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
    font-size: 16px;
    margin-left: 14px;
    font-weight: lighter;
    color: #999999;
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
    font-size: 16px;
    margin-left: 14px;
    font-weight: lighter;
    color: #999999;
    margin-bottom: 6px;
    margin-top: 6px;
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
  flex: 1;
  strong {
    color: #444444;
    font-size: 16px;
    line-height: 25px;
  }
  aside {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  div:first-child {
    display: flex;
    flex-direction: column;
  }
  span {
    color: #666666;
    font-size: 16px;
    margin-bottom: 4px;
    margin-top: 4px;
  }
  img {
    max-width: 234px;
    height: 36px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  img {
    max-width: 247px;
    height: 120px;
  }
`;

export const Title = styled.strong`
  margin-bottom: 4px;
  color: #444444;
  font-size: 16px;
`;
