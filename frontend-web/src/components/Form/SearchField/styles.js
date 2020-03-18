import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  input {
    width: 237px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    font-size: 16px;
    color: #444;
    padding-left: 16px;

    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      /* font-size: 1.3rem; */
      cursor: text;
      top: 21px;
      padding-left: 16px;
    }
  }

  input:focus {
    -webkit-animation: glow 800ms ease-out infinite alternate;
    -moz-animation: glow 800ms ease-out infinite alternate;
    -o-animation: glow 800ms ease-out infinite alternate;
    -ms-animation: glow 800ms ease-out infinite alternate;
    animation: glow 800ms ease-out infinite alternate;

    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 5px rgba(0, 255, 0, 0.1),
      0 2px 0 #000;

    ~ .form__label {
      position: absolute;
      top: -10px;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #757575;
      font-weight: 700;
      padding-left: 0px;
    }
  }

  .form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
  }

  .form__label {
    position: absolute;
    top: -10px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #757575;
  }

  /* ANIMATIONS */

  @-webkit-keyframes glow {
    0% {
      border-color: #353399;
      box-shadow: 0 0 5px rgba(125, 64, 231, 0.24),
        inset 0 0 5px rgba(0, 255, 0, 0.1);
    }

    100% {
      border-color: #4152cb;
      box-shadow: 0 0 8px rgb(125, 64, 231), inset 0 0 1px rgba(0, 255, 0, 0.4);
    }
  }

  @-moz-keyframes glow {
    0% {
      border-color: #353399;
      box-shadow: 0 0 5px rgba(125, 64, 231, 0.24),
        inset 0 0 5px rgba(0, 255, 0, 0.1);
    }

    100% {
      border-color: #4152cb;
      box-shadow: 0 0 8px rgb(125, 64, 231), inset 0 0 1px rgba(0, 255, 0, 0.4);
    }
  }

  @-o-keyframes glow {
    0% {
      border-color: #353399;
      box-shadow: 0 0 5px rgba(125, 64, 231, 0.24),
        inset 0 0 5px rgba(0, 255, 0, 0.1);
    }

    100% {
      border-color: #4152cb;
      box-shadow: 0 0 8px rgb(125, 64, 231), inset 0 0 1px rgba(0, 255, 0, 0.4);
    }
  }

  @-ms-keyframes glow {
    0% {
      border-color: #353399;
      box-shadow: 0 0 5px rgba(125, 64, 231, 0.24),
        inset 0 0 5px rgba(0, 255, 0, 0.1);
    }

    100% {
      border-color: #4152cb;
      box-shadow: 0 0 8px rgb(125, 64, 231), inset 0 0 1px rgba(0, 255, 0, 0.4);
    }
  }

  @keyframes glow {
    0% {
      border-color: #353399;
      box-shadow: 0 0 5px rgba(125, 64, 231, 0.24),
        inset 0 0 5px rgba(0, 255, 0, 0.1);
    }

    100% {
      border-color: #4152cb;
      box-shadow: 0 0 4px rgb(125, 64, 231), inset 0 0 1px rgba(0, 255, 0, 0.4);
    }
  }
`;
