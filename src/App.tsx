import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "", // 기본 경로 (홈 화면)
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

// 전역 스타일 설정
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
  }
`;

// 화면을 감싸는 Wrapper 스타일
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase 인증 상태 감지
    //await auth.authStateReady(); // 존재하지 않는 Firebase 메서드 (오류 원인)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // 인증 상태가 확인되면 로딩 종료
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 이벤트 리스너 해제
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
