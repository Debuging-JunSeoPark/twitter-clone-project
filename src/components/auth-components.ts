import { styled } from "styled-components";

export const Wrapper = styled.div`
    height: 100%;  // 화면 높이만큼 확보
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

export const Title = styled.h1`
    font-size: 42px;
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 0; 
    margin-bottom: 10px;
`;

export const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    
    &[type= "submit"] {
        cursor: pointer;
        font-weight: bold;
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a{
    color: #1d9bf0;
    }
`;