# 🐦 트위터 클론 코딩 학습 기록  

## 📌 개요  
이 프로젝트는 **트위터 클론 코딩**을 통해 React를 학습하는 과정입니다.  
매일 배운 내용을 기록하며, 주요 개념과 구현한 기능을 정리합니다.  

## 🛠️ 기술 스택  
- Frontend: React  

### 📆 학습 기록  

<details>
  <summary>📅 2025-03-13  2.1 Routing</summary>

- React Router 설정 (`react-router-dom` 활용)  
- `createBrowserRouter`를 사용한 라우팅 구조 생성  
- `Outlet`을 활용한 레이아웃 컴포넌트 적용  
- 로그인 및 회원가입 페이지는 레이아웃에서 제외  
- `styled-components`를 사용한 글로벌 스타일 적용 (`createGlobalStyle`)  

</details>

<details>
  <summary>📅 2025-03-14  2.2 LoadingScreen</summary>

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
