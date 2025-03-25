# 트위터 클론 코딩 학습 기록  

## 📌 개요  
이 프로젝트는 **트위터 클론 코딩**을 통해 React를 학습하는 과정입니다.  
매일 배운 내용을 기록하며, 주요 개념과 구현한 기능을 정리합니다.  

## 🛠️ 기술 스택  
- Frontend: React  

### 📆 학습 기록  

<details>
  <summary>📅 2025-03-13  Routing</summary>

- React Router 설정 (`react-router-dom` 활용)  
- `createBrowserRouter`를 사용한 라우팅 구조 생성  
- `Outlet`을 활용한 레이아웃 컴포넌트 적용  
- 로그인 및 회원가입 페이지는 레이아웃에서 제외  
- `styled-components`를 사용한 글로벌 스타일 적용 (`createGlobalStyle`)  

</details>

<details>
  <summary>📅 2025-03-14  LoadingScreen</summary>

- **Firebase Authentication을 위한 로딩 처리 로직 추가**  
  - `isLoading` 상태(`useState`)를 활용하여 초기값을 `true`로 설정  
  - Firebase가 사용자 인증 정보를 확인할 시간을 확보하기 위해 `async` 함수 `init` 생성  
  - `useEffect`를 사용하여 컴포넌트 마운트 시 `init` 실행 → Firebase 확인 후 `isLoading`을 `false`로 변경  
  - `isLoading` 값에 따라 **로딩 화면 (`LoadingScreen`) 또는 `RouterProvider` 렌더링**  

#### 🆕 새롭게 알게 된 개념  

<details>
  <summary>1. &lt;Wrapper&gt; 태그</summary>

- `styled-components`를 사용할 때, **스타일이 적용된 컨테이너 컴포넌트**로 활용됨.  
- `div` 대신 **`styled.div`를 생성하여** `Wrapper`처럼 사용 가능.  
- 일반적으로 **레이아웃을 잡거나 특정 스타일을 적용할 때 유용**함.  

</details>

<details>
  <summary>2. `useEffect(() => { init(); }, []);` 구조</summary>

- `useEffect`는 **리액트 컴포넌트가 렌더링될 때 실행되는 사이드 이펙트 처리용 함수**.  
- 위 코드의 역할:  
  1. **컴포넌트가 처음 렌더링될 때(`[]` 의존성 배열이 빈 배열이므로)** `init()` 함수를 실행.  
  2. `init()`은 Firebase가 사용자 정보를 확인하는 **비동기 함수**.  
  3. Firebase 확인이 끝나면 `isLoading` 상태를 `false`로 변경.  
- 핵심 개념:  
  - `useEffect`의 **두 번째 인자로 빈 배열 `[]`을 넘기면, 마운트 시 한 번만 실행됨**.  
  - `useEffect` 내부에서 `init()` 호출 → **초기 설정 및 비동기 데이터 로딩 처리 가능**.  

</details>

</details>

<details>
  <summary>📅 2025-03-18  Create Account Page</summary>

- **회원가입 페이지 UI 및 입력 로직 구현**  
  - `styled-components`를 활용하여 **Wrapper, Form, Input 컴포넌트 생성**  
  - `useState`를 활용하여 **name, email, password 상태 관리**  
  - `onChange` 이벤트 핸들러를 활용하여 **입력값을 상태와 연결**  
  - `onSubmit` 이벤트 핸들러를 활용하여 **폼 제출 시 값 확인 (console.log)**  

- **회원가입 로딩 상태 처리**  
  - `isLoading` 상태(`useState`)를 활용하여 **회원가입 중 로딩 화면 표시**  
  - `try-catch-finally` 블록을 활용하여 **Firebase 연동 시 로딩 상태 변경**  
  - 에러 발생 시 **에러 메시지 상태(`error`) 추가 및 화면에 표시**  

- **스타일링 개선 (CSS 적용)**  
  - `styled-components`를 활용하여 **입력 필드 및 버튼 스타일 적용**  
  - `Wrapper`를 사용해 **회원가입 페이지를 화면 중앙에 정렬**  
  - `input[type="submit"]`에 **hover 효과 추가 (opacity 조정)**  

#### 🆕 새롭게 알게 된 개념  

<details>
  <summary>4. `e.preventDefault();` 를 사용한 새로고침 방지</summary>

- `e.preventDefault();`는 **HTML 폼이 기본적으로 실행하는 새로고침 동작을 막아주는 역할**을 함.  
- 폼이 제출될 때 페이지가 리로드되지 않도록 하여 **비동기 처리(Firebase 연동 등)를 원활하게 수행할 수 있음**.  
- `onSubmit` 이벤트 핸들러에서 호출하여 **입력된 데이터를 유지한 상태로 처리 가능**.  

```jsx
const onSubmit = (event) => {
  event.preventDefault(); // 폼 제출 시 새로고침 방지
  console.log(name, email, password);
};
```
</details>

</details>

 <details>
  <summary>📅 2025-03-20  Firebase Authentication</summary>

- **Firebase를 활용한 회원가입 기능 구현**  
  - `createUserWithEmailAndPassword`를 사용하여 **Firebase 인증으로 사용자 계정 생성**  
  - `updateProfile`을 사용하여 **사용자의 Display Name 설정**  
  - `navigate`를 활용하여 **회원가입 완료 후 홈 화면으로 이동**  

- **회원가입 로딩 상태 처리**  
  - `isLoading` 상태(`useState`)를 활용하여 **회원가입 중 로딩 화면 표시**  
  - `try-catch-finally` 블록을 활용하여 **Firebase 연동 시 로딩 상태 변경**  
  - 에러 발생 시 **에러 메시지 상태(`error`) 추가 및 화면에 표시**  

- **회원가입 입력값 유효성 검사**  
  - `name`, `email`, `password`가 비어 있는지 확인하고 비어 있으면 회원가입 진행하지 않음  
  - `isLoading` 상태가 `true`일 때 중복 제출 방지  

- **회원가입 성공 후 자동 로그인 처리**  
  - Firebase는 `createUserWithEmailAndPassword`를 사용하면 **자동으로 로그인된 상태**가 됨  
  - `updateProfile`을 사용하여 사용자 프로필 업데이트 가능  

#### 🆕 새롭게 알게 된 개념  

<details>
  <summary>1. `createUserWithEmailAndPassword` 를 사용한 Firebase 회원가입</summary>

- `createUserWithEmailAndPassword(auth, email, password)`를 사용하면 **Firebase에서 계정을 생성**할 수 있음.  
- 계정 생성이 완료되면 **사용자는 자동으로 로그인됨**.  
- `try-catch` 문을 활용하여 **계정 생성 오류를 감지하고 처리** 가능.  

```jsx
const onSubmit = async (event) => {
  event.preventDefault();
  if (!name || !email || !password || isLoading) return;

  setIsLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created:", userCredential.user);

    // 사용자 프로필 업데이트
    await updateProfile(userCredential.user, { displayName: name });

    // 회원가입 후 홈으로 이동
    navigate("/");
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    setIsLoading(false);
  }
};
```
 </details>
</details>

<details>
  <summary>📅 2025-03-24  Protected Route & Logout</summary>

- **Protected Route 컴포넌트 구현**  
  - `auth.currentUser`를 통해 사용자가 로그인했는지 여부 확인  
  - 로그인 상태가 아니라면 `<Navigate to="/login" />`을 통해 **로그인 페이지로 리디렉션**  
  - 로그인 상태라면 `children`을 반환하여 **보호된 페이지 표시**  
  - `Layout` 컴포넌트를 `ProtectedRoute`로 감싸 **Home / Profile 등 하위 경로를 한 번에 보호**  

- **로그아웃 기능 추가**  
  - `signOut(auth)`를 호출하여 **Firebase에서 사용자 로그아웃 처리**  
  - 로그아웃 후 페이지 새로고침 시 자동으로 **로그인 페이지로 이동**됨 (`ProtectedRoute` 덕분)  
  - Home 페이지에 테스트용 로그아웃 버튼 구현  

---

🌟 **Protected Route의 개념**

- `ProtectedRoute`는 **특정 조건을 만족한 사용자만 특정 페이지에 접근할 수 있도록 보호하는 컴포넌트**  
- 주로 인증(로그인) 여부, 사용자 권한, 구독 상태 등의 조건을 기반으로 접근 제어를 수행
- 조건을 만족하지 않으면 다른 페이지(예: 로그인, 접근 거부 페이지 등)로 리디렉션
- 리액트의 `children` 속성을 통해 **내부에 감싸진 컴포넌트를 조건 만족 시에만 렌더링**

```tsx
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}
```
 </details>
</details>
<details>
  <summary>📅 2025-03-25  Login 구현 & 에러 처리 개선</summary>

- **회원가입/로그인 시 에러 처리 로직 개선**  
  - `try-catch` 블록을 통해 Firebase 에러를 포착하고 사용자에게 알림 표시  
  - 기존 `setError(message)` 방식 대신, **더 사용자 친화적인 메시지 출력 구조 구상**  
  - 에러가 발생한 경우 `instanceof FirebaseError`로 구분 후 `error.code`, `error.message` 추출 가능

- **로그인 기능 구현 (`signInWithEmailAndPassword`)**  
  - 이메일/비밀번호가 비어 있거나 `isLoading` 상태일 경우 제출 방지  
  - 로그인 성공 시 홈 화면으로 이동 (`navigate("/")`)  
  - 로그인 실패 시 Firebase에서 제공하는 메시지를 출력  

- **회원가입/로그인 전환 링크 추가 (`Link` 컴포넌트 사용)**  
  - 로그인 페이지에 “계정이 없으신가요?” → 회원가입 페이지로 이동  
  - 회원가입 페이지에 “이미 계정이 있으신가요?” → 로그인 페이지로 이동  
  - 중복되는 스타일 요소는 `auth-components.ts`에 공통화하여 재사용  

---

🎯 **Toast를 활용한 사용자 친화적 에러 표시 적용**
설치 명령어:

```bash
npm install react-toastify
```

- `react-toastify`를 도입하여 사용자에게 **더 직관적이고 눈에 띄는 에러 메시지 제공**
- 기존의 `<Error>{error}</Error>` 렌더링 방식보다 유지보수성과 UX 측면에서 향상됨

```tsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

try {
  // Firebase 로그인/회원가입 로직
} catch (error) {
  if (error instanceof FirebaseError) {
    toast.error(error.message); // 사용자에게 에러 메시지를 띄움
  }
}
```
- `App.tsx` 또는 루트 컴포넌트에 `<ToastContainer />`를 추가하여 어느 컴포넌트에서도 토스트 메시지 출력 가능

```tsx
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
```

✅ 장점

에러가 화면 상단에 애니메이션과 함께 표시되어 가시성 증가

로그인/회원가입 화면의 코드가 더 깔끔해지고 단순해짐

사용자 경험(UX) 관점에서도 긍정적 효과

🆕 새롭게 알게 된 개념
<details> <summary>1. `instanceof`를 사용한 에러 타입 구분</summary>
instanceof 키워드를 사용하면 특정 객체가 어떤 클래스의 인스턴스인지 확인할 수 있음

Firebase에서 발생한 에러가 FirebaseError 클래스의 인스턴스인지 확인하여 에러를 선별적으로 처리 가능

```tsx
if (error instanceof FirebaseError) {
  toast.error(error.message);
}
```
</details> <details> <summary>2. `Switcher` 태그를 활용한 로그인/회원가입 페이지 전환</summary>
styled-components로 만든 Switcher 컴포넌트를 사용해
회원가입 ↔ 로그인 페이지 간 이동을 유도하는 UI 구성 요소 구현

```tsx
<Switcher>
  계정이 없으신가요? <Link to="/create-account">회원가입</Link>
</Switcher>
```
컴포넌트화하여 로그인/회원가입 페이지 모두에서 재사용 가능하며 스타일 유지도 쉬움

</details> </details> 
