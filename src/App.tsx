import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect,useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"

const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    //Home 과 profile은 laycomponent 안에서 rednder
    children: [
      {
        path: "", //경로를 따로 하지 않았을때는 현재 위치 
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ]
  },
  //login과 create-account는 layout에 감싸지 않고 따로 빼줌 
  //layout은 login한 계정만 볼 수 있게 하는 장치
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  }
])
const GlobalStyles = createGlobalStyle`
  ${reset};
   *{
  box-sizing: border-box;
  }
  body{
    background-color: black;
    color: white;
`;

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady(); //인증 상태가 준비되었는지 기다리는 중
    setLoading(false);
   
  }
  useEffect(() =>{
    init();

  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : < RouterProvider router = {router} />}
   
    </Wrapper>
  )
}

export default App
