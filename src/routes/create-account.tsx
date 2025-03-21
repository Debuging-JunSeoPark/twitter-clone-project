import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
    height: 100%;  // 화면 높이만큼 확보
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 0; 
`;

const Input = styled.input`
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

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{
            target: {name, value},
        } = e;
        if(name ==="name"){
            setName(value);
        } else if (name === "email"){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //새로 고침 방지
        if(isLoading || name === "" || email === ""  || password ==="") return;
        try{
            setLoading(true);
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credential.user);
            await updateProfile(credential.user, {
                displayName: name,
            });
            navigate("/");
        }catch(e){

        }
        finally{
            setLoading(false);
        }
      
        console.log(name, email, password);
    }

    return (
        <Wrapper>
        <Form onSubmit={onSubmit}>
            <Title>Join 𝕏</Title>
            <Input 
            onChange={onChange}
            name="name" 
            value={name} 
            placeholder="Name" 
            type="text" 
            required/>

            <Input 
            onChange={onChange}
            name="email" 
            value={email}  
            placeholder="Email" 
            type="email" 
            required/>

            <Input 
            onChange={onChange}
            name="password" 
            value={password}  
            placeholder="Password" 
            type="password" 
            required/>

            <Input 
            type="submit" 
            value={isLoading? "Loading" : "Create account"}/>

        </Form>
        {error !=="" ? <Error>{error}</Error> : null}
    </Wrapper>
    );
}