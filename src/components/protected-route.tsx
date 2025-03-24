import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
    children
} : {
    children:React.ReactNode;
}){
    const user = auth.currentUser; //사용자가 로그인 한 상태인지 아닌지 분류
    if(user === null){
        return <Navigate to="/login"/>;
    }
    return children
}