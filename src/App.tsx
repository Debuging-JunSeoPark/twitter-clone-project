import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
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
    font

 
`;



function App() {


  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  )
}

export default App
