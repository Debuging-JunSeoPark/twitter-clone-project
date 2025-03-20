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

<details>
  <summary>📅 2025-03-20  2.4 Firebase Authentication</summary>

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


