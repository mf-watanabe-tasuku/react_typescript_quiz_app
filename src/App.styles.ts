import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/ocean.jpg';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    * {
        font-family: 'Catamaran', sans-serif;
        box-sizing: border-box;
    }

    input {
        margin: 0;
    }

    .btn {
        cursor: pointer;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }

    .stack > * + * {
        margin-top: 50px;
    }

    .center {
        text-align: center;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }

    .score {
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: Fascinate Inline, 'Arial Narrow Bold', sans-serif;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        font-weight: 400;
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        text-align: center;
        margin: 20px;
        user-select: none;
    }

    .start, .next, .change {
        height: 40px;
        padding: 0 40px;
    }

    .start, .next {
        background: #fff;
        border: 2px solid #f6b026;
    }

    .start {
        max-width: 200px;
    }

    .change {
        color: #777;
        background: #f0f0f0;
        border: 2px solid #a0a0a0;
    }

    .retry {
        color: #fff;
        background: #f6b026;
        border: 2px solid #f7da3d;
    }

    .difficultyBox {
        display: grid;
        column-gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
    }

    .difficultyButton input[type="radio"] {
        display: none;

        :checked + label  {
            background-color: #ebfeff;
            border: 2px solid #0085a3;
        }

        + label  {
            display: block;
            cursor: pointer;
            background-color: #fff;
            border-radius: 5px;
            padding: 20px 30px;
            border: 2px solid #fff;
        }
    }

    .btnBoxWrap {
        display: flex;
        justify-content: center;
    }

    .btnBox {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;
    }
`;