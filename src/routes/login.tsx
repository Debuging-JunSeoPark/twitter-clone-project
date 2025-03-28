import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate} from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import { toast } from "react-toastify";
import GithubButton from "../components/github-btn";





export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{
            target: {name, value},
        } = e;
        if (name === "email"){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //새로 고침 방지
        setError(""); //에러 내용 초기화
        if(isLoading || email === ""  || password ==="") return;
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch(e) {
            if (e instanceof FirebaseError) {
              toast.error(e.message); // ✅ Toast로 출력
            }
          }
        finally{
            setLoading(false);
        }
      
        console.log(name, email, password);
    }

    return (
        <Wrapper>
        <Form onSubmit={onSubmit}>
            <Title>Log into 𝕏</Title>

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
            value={isLoading? "Loading" : "Log in"}/>

        </Form>
        {error !=="" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
       <GithubButton/>
    </Wrapper>
    );
}