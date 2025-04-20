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

<details>
  <summary>📅 2025-03-27  Social Login (GitHub)</summary>

- **GitHub 소셜 로그인 연동 (Firebase Authentication)**  
  - Firebase 콘솔의 **Authentication > Sign-in method**에서 GitHub 로그인 활성화  
  - GitHub 개발자 설정에서 OAuth 앱 등록 (`https://github.com/settings/developers`)  
    - 콜백 URL은 Firebase에서 제공하는 주소 사용  
    - Client ID, Client Secret을 Firebase에 등록 후 저장

- **GitHub 로그인 버튼 컴포넌트 생성**  
  - `public/` 디렉토리에 GitHub SVG 아이콘 추가  
  - `styled-components`로 스타일링된 버튼 구현  
  - `login` 및 `create-account` 페이지에 GitHub 버튼 삽입

- **Firebase GitHub Provider로 로그인 처리 구현**  
  - `GitHubAuthProvider` 인스턴스 생성  
  - `signInWithPopup(auth, provider)` 또는 `signInWithRedirect(auth, provider)` 사용 가능  
  - 로그인 성공 시 `navigate("/")`를 통해 홈으로 리디렉션  
  - 로그인 실패 시 콘솔에 에러 출력 (`popup-cancelled`, `auth/account-exists-with-different-credential` 등)

- **주의 사항**  
  - 동일한 이메일로 이미 가입된 계정이 있다면 **다른 자격 증명 충돌 에러 발생**  
  - Firebase 콘솔에서 GitHub 로그인을 활성화하지 않으면 로그인 시도 자체가 실패함

- **결과**
  - 이메일/비밀번호 없이 **GitHub 계정만으로 로그인 가능**
  - 기존 로그인 흐름에 **소셜 로그인 옵션이 추가됨**으로써 사용자 접근성 향상  
  - 인증 완료 후 홈으로 리디렉션되어 정상 로그인 상태 유지 확인

</details>

<details>
  <summary>📅 2025-03-28  Firebase 인증 기능 마무리 복습</summary>

---

### 🔑 Firebase `auth` 객체에서 자주 사용하는 메서드

| 메서드 | 설명 |
|--------|------|
| `auth.currentUser` | 현재 로그인된 사용자 정보 (없으면 `null`) |
| `signInWithEmailAndPassword(auth, email, password)` | 이메일/비밀번호로 로그인 |
| `createUserWithEmailAndPassword(auth, email, password)` | 이메일/비밀번호로 회원가입 |
| `updateProfile(user, { displayName })` | 사용자 프로필 이름 설정 |
| `signOut(auth)` | 로그아웃 처리 |
| `sendPasswordResetEmail(auth, email)` | 비밀번호 재설정 이메일 발송 |

---

### ⏳ 비동기 처리 흐름

- 회원가입 및 로그인 요청은 **`async/await + try-catch`** 조합으로 처리
- `isLoading` 상태를 통해 요청 중 중복 클릭 방지 및 로딩 처리
- `useEffect(() => { init(); }, [])`로 초기 로그인 상태 확인

---

### 🎨 styled-components 사용 이유

- 기존 CSS 파일보다 **컴포넌트 단위로 스타일을 관리**할 수 있어 유지보수가 용이함  
- JS 안에서 스타일을 선언할 수 있어 **조건부 스타일링, 재사용성**이 뛰어남  
- 여러 페이지에서 공통 사용되는 폼 UI 구성요소들을 **분리 및 재사용** 가능

---

### 💡 상태(state) 한 줄로 줄이기 팁

> 여러 개의 상태값을 객체로 묶어서 간결하게 관리 가능

```tsx
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  isLoading: false,
  error: "",
});
```
```tsx
// 업데이트 예시
setForm(prev => ({ ...prev, email: "example@email.com" }));
상태 관리를 하나의 객체로 합치면 가독성과 확장성 모두 향상됨
```
</details> 

<details>
  <summary>📅 2025-03-29  Layout 구성 및 내비게이션 바 구현</summary>

- **로그인 후 사용자 화면에 고정될 내비게이션 바(UI) 구성**  
  - `Layout` 컴포넌트에 `Wrapper`와 `Menu`, `MenuItem` 구조로 좌측 고정 바 생성  
  - `Home`, `Profile`, `Logout` 아이콘을 **[HeroIcons](https://heroicons.com/)** 에서 SVG로 가져와 적용  
  - `Link` 컴포넌트를 활용하여 페이지 이동 (홈/프로필), 로그아웃은 버튼 처리  
  - 로그아웃 클릭 시 `window.confirm()`을 사용해 **사용자 확인 후** 로그아웃 처리  

- **스타일 구성 (`styled-components`)**
  - `Wrapper`: `display: grid;`, `grid-template-columns: 1fr 4fr`로 **좌우 영역 분할**  
  - `Menu`: `display: flex;`, `flex-direction: column;` 으로 **세로 정렬된 버튼 구성**  
  - `MenuItem`: 원형 버튼 형태 (`border-radius: 50%`, `width/height: 50px`)  

- **로그아웃 처리 흐름**
  - 클릭 시 `window.confirm()`으로 확인 팝업 출력  
  - 확인 시 `await signOut(auth)` → `navigate("/login")`  

---

### 🆕 새롭게 알게 된 개념

<details>
  <summary>1. `grid-template-columns`를 사용한 CSS Grid 레이아웃</summary>

- `grid-template-columns`는 CSS Grid에서 **각 열의 비율 또는 크기를 지정**하는 속성  
- 예시: `grid-template-columns: 1fr 4fr`  
  - 전체 화면을 5등분하여, 왼쪽은 `1`, 오른쪽은 `4` 비율로 너비를 나눔  
  - **사이드바 + 본문 구성**에 유용함  
- 함께 사용된 속성 예시:

```tsx
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  padding: 50px 0;
  max-width: 860px;
  width: 100%;
`;
```
</details> 
</details>

<details>
  <summary>📅 2025-03-31  Post Tweet Form 구성</summary>

### 📌 구현한 내용

- **트윗 작성 폼(PostTweetForm) 컴포넌트 구현**  
  - `<textarea>`를 사용하여 트윗 내용 입력 가능  
  - 이미지 파일 첨부 기능 추가 (`input type="file"` + `label` 클릭으로 연결)  
  - 작성 버튼과 첨부 버튼에 스타일 적용 (`styled-components`)  

- **입력 상태 관리 (State)**  
  - `useState`로 `tweet`, `file`, `isLoading` 상태 관리  
  - `onChange` 이벤트로 텍스트 입력 및 파일 첨부 처리  

- **조건부 렌더링**  
  - 첨부된 파일 유무에 따라 `"Add Photo"` → `"Photo Added"` 텍스트 전환  
  - `accept="image/*"`로 이미지 파일만 허용  
  - `rows`, `maxLength`를 통해 텍스트 입력 크기 제한  

---

### 🆕 새롭게 알게 된 개념
<details>

#### ⭐ `htmlFor="file"`의 의미
- `<label>` 요소에 `htmlFor="file"`을 설정하면  
  해당 `label` 클릭 시 `id="file"`을 가진 `<input>` 요소가 클릭됨  
- 즉, **기본 파일 업로드 UI 대신 커스텀 버튼(`label`)으로 파일 업로드 트리거 가능**  
- 실제 `<input type="file">`은 `display: none`으로 숨기고 UI는 `label`로 대체함

```tsx
<label htmlFor="file">Add Photo</label>
<input type="file" id="file" accept="image/*" style={{ display: "none" }} />
```

---

#### ⭐ `accept="image/*"`의 의미
- `input`의 `accept` 속성은 **업로드할 수 있는 파일의 형식을 제한**함  
- `"image/*"`은 **모든 이미지 확장자(jpg, png, gif 등)를 허용**하는 의미  
- 사용자가 다른 형식(PDF 등)을 첨부하려고 하면 브라우저가 제한함

```tsx
<input type="file" accept="image/*" />
```

</details>
</details>

<details>
  <summary>📅 2025-04-03  이미지 업로드 & 트윗 저장</summary>

- **Firebase Storage & Firestore 연동하여 이미지 포함 트윗 저장**  
  - 트윗 작성 시 사용자가 사진을 첨부했다면, 해당 이미지를 Firebase Storage에 업로드  
  - 업로드한 이미지의 **Download URL을 Firestore 문서에 추가**하여 트윗 내용과 함께 저장  

- **업로드 경로 설계**  
  - `tweets/{username}_{userId}/{doc.id}` 형태로 저장  
  - 사용자별로 폴더 분리하여 트윗 이미지 관리  

- **Firestore 문서 업데이트 흐름**  
  - `addDoc()`으로 트윗 생성 → 트윗 ID 확보  
  - `uploadBytes()`로 Storage에 이미지 업로드  
  - `getDownloadURL()`로 이미지 URL 확보  
  - `updateDoc()`으로 해당 트윗 문서에 이미지 URL 추가

- **트윗 완료 후 상태 초기화 처리**  
  - `setTweet("")`, `setFile(null)`로 입력 필드 초기화

---

### 🔄 트윗 + 이미지 저장 흐름 요약

```tsx
const locationRef = ref(storage, `tweets/${user.displayName}_${user.uid}/${doc.id}`);
await uploadBytes(locationRef, file);
const url = await getDownloadURL(locationRef);
await updateDoc(doc, { photo: url });
```

---

### 📌 `required` 속성의 개념

- `required`는 **HTML의 유효성 검사 속성 중 하나**
- 해당 입력 필드에 **값이 입력되지 않으면 폼 제출을 막음**
- 브라우저가 자동으로 "이 필드를 입력하세요"와 같은 메시지를 보여줌  
- 주로 사용자 입력이 **반드시 필요한 경우에 사용**

```html
<input type="text" required />
```

예시: 사용자가 아무것도 입력하지 않고 폼을 제출하려 할 때, 제출이 중단됨

</details>



<details>
<summary>📆 2025-04-07 Firestore 쿼리 및 Tweet 렌더링  </summary>

- **Firestore에서 트윗 데이터 가져오기**
  - `getDocs()`와 `query()` 조합을 통해 Firestore의 `tweets` 컬렉션에서 데이터 조회
  - `orderBy("createdAt", "desc")`로 최신순 정렬
  - `snapshot.docs.map()`을 활용해 데이터 가공 후 `useState`로 상태 업데이트  

- **타입 정의 및 상태 관리**
  - `interface ITweet` 정의하여 트윗 데이터의 타입 명세
  - `useState<ITweet[]>`로 트윗 리스트 상태 관리  

- **`Tweet` 컴포넌트 분리 및 렌더링**
  - `Tweet.tsx` 생성하여 트윗 단일 UI 렌더링 컴포넌트 구현
  - `props`로 트윗 내용, 유저명, 이미지 등을 전달 받아 렌더링
  - `map()`을 통해 리스트 렌더링 시 `key`로 `tweet.id` 활용  

- **UI 구성**
  - `styled-components`를 활용한 `Wrapper`, `Username`, `Payload`, `Photo` 등의 UI 스타일 적용  
  - `grid-template-columns`를 사용한 트윗 배치 구성  

---

### 새롭게 알게 된 개념

<details>
  <summary>`grid-template-rows` + `overflow-y: scroll`을 활용한 레이아웃</summary>

- 상단에 트윗 작성 폼 고정, 하단 트윗 리스트만 스크롤 되도록 설정  
- `grid-template-rows: 1fr 5fr` + `overflow-y: scroll` 조합 활용  
</details>
</details>

<details>
<summary>📆 2025-04-08 Firestore 실시간 쿼리 (`onSnapshot`)  </summary>

### 🔄 실시간 데이터 구독 기능 구현

- `getDocs()` 대신 `onSnapshot()`을 사용하여 **쿼리 결과에 대한 실시간 구독** 구현
- Firestore에서 데이터 **추가 / 수정 / 삭제 시 자동 반영**
- `useEffect` 내에서 `onSnapshot()` 호출 → **마운트 시 구독 시작, 언마운트 시 구독 해제**

```tsx
useEffect(() => {
  const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        id: doc.id,
        tweet,
        createdAt,
        userId,
        username,
        photo,
      };
    });
    setTweets(tweets);
  });

  return () => {
    // 언마운트 시 실시간 구독 해제 (cleanup)
    unsubscribe();
  };
}, []);
```

---

### ⚠️ 성능 고려: `limit()` 적용

- **불필요한 데이터 과다 수신 방지**를 위해 `limit()` 사용
- 예: `limit(25)` → 최근 25개 트윗만 조회

```tsx
const tweetsQuery = query(
  collection(database, "tweets"),
  orderBy("createdAt", "desc"),
  limit(25)
);
```

---

### 새롭게 알게 된 개념

<details>
  <summary>1. `teardown` / `cleanup` 함수</summary>

- `useEffect`에서 **리턴하는 함수는 컴포넌트 언마운트 시 실행됨**
- 실시간 구독(`onSnapshot`) 또는 이벤트 리스너 제거 시 사용
- **메모리 누수 방지** 및 **불필요한 구독 제거**를 위해 필수

```tsx
useEffect(() => {
  const unsubscribe = onSnapshot(...);
  return () => {
    unsubscribe(); // 컴포넌트가 사라질 때 구독 해제
  };
}, []);
```

</details>

<details>
  <summary>2. `await`의 사용 이유</summary>

- `onSnapshot` 자체는 **비동기 함수가 아니므로 `await`가 필요하지 않음**
- 기존 `getDocs()`는 `await`가 필요했지만, `onSnapshot()`은 동기적으로 **unsubscribe 함수**를 반환함
- 실무에서는 `await onSnapshot()` ❌ → **단순히 `onSnapshot()` 호출** ✅

```tsx
// ❌ 잘못된 예시
const unsubscribe = await onSnapshot(...);

// ✅ 올바른 사용
const unsubscribe = onSnapshot(...);
```

</details>

</details>


<details>
<summary>📆 2025-04-10 트윗 삭제 기능 구현</summary>

### 트윗 삭제 조건 및 기능 구현

- 트윗 작성자와 현재 로그인 사용자의 ID가 동일할 경우에만 **삭제 버튼 표시**
- 삭제 시 다음 두 작업을 함께 수행:
  1. **Firestore에서 트윗 문서 삭제**
  2. **Firebase Storage에서 연결된 이미지 파일 삭제**

```tsx
// 삭제 버튼 클릭 시
const onDelete = async () => {
  const ok = confirm("Are you sure you want to delete this tweet?");
  if (!ok || !user || user.uid !== userId) return;

  try {
    // 1. Firestore에서 문서 삭제
    await deleteDoc(doc(database, "tweets", id));

    // 2. Storage에서 이미지 삭제 (이미지가 존재할 경우)
    if (photo) {
      const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
      await deleteObject(photoRef);
    }
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);
  }
};
```

---

### 삭제 버튼 조건부 렌더링

```tsx
{user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
```

---

### 이미지 경로 규칙

트윗 이미지 파일은 아래 경로에 저장됨:

```
tweets/{user.uid}/{tweet.id}
```

> 👉 트윗 삭제 시 이미지 파일 경로를 쉽게 참조하기 위해 **트윗의 ID와 이미지 파일명 일치**시킴

---

### 새롭게 알게 된 개념

<details>
  <summary>1. `ref()` 함수 (Firebase Storage)</summary>

- `ref()`는 Firebase Storage 내의 **파일 또는 디렉토리의 경로를 참조**하기 위한 함수
- 예를 들어, 특정 사용자의 트윗 이미지에 대한 참조 객체를 만들 때 사용

```tsx
const photoRef = ref(storage, `tweets/${user.uid}/${tweet.id}`);
```

- 해당 `ref` 객체는 다음과 같은 작업에 사용됨:
  - 파일 업로드: `uploadBytes(photoRef, file)`
  - URL 가져오기: `getDownloadURL(photoRef)`
  - 파일 삭제: `deleteObject(photoRef)`
</details>
</details>

<details>
<summary>📆 2025-04-16 유저 프로필 아바타 업로드 구현</summary>

### 📌 구현한 내용

- **사용자 프로필 화면(Profile Page) 구성**
  - 사용자 이름과 아바타(프로필 사진) 표시
  - 아바타가 없을 경우 SVG 아이콘으로 대체
  - 아바타 클릭 시 파일 선택창 열림 (커스텀 스타일링된 label 사용)

- **이미지 업로드 흐름**
  1. `<input type="file" accept="image/*" />`로 이미지 파일 선택
  2. Firebase Storage에 이미지 업로드
  3. 업로드된 이미지의 URL을 사용자 프로필에 저장 (`updateProfile`)
  4. 상태 업데이트 (`setAvatar`) → 화면에 즉시 반영

- **Firebase Storage 저장 경로 설계**
  - 아바타는 `avatars/{userId}` 경로에 저장됨
  - 동일한 경로에 **이미지를 덮어쓰기(override)** 하여 스토리지 용량 최적화

---

### 💡 새롭게 알게 된 개념

<details>
<summary>1. 아바타 업로드 버튼과 숨겨진 input 연결</summary>

- `<label>`과 `<input type="file">`를 연결하여 커스텀 버튼처럼 동작하게 구현
- `htmlFor="avatar"`와 `id="avatar"` 속성을 사용

```tsx
<label htmlFor="avatar">Upload Avatar</label>
<input type="file" id="avatar" accept="image/*" style={{ display: "none" }} />
```

</details>

<details>
<summary>2. Firebase Storage에 아바타 이미지 업로드</summary>

- `ref()` 함수를 사용해 저장 경로 참조 객체 생성
- 사용자 ID를 이미지 이름으로 사용 → 덮어쓰기 방식으로 관리

```tsx
const locationRef = ref(storage, `avatars/${user.uid}`);
await uploadBytes(locationRef, file);
const url = await getDownloadURL(locationRef);
```

</details>

<details>
<summary>3. `updateProfile`로 사용자 이미지 URL 설정</summary>

- Firebase Authentication의 사용자 프로필에 아바타 URL 저장
- 저장된 URL은 `user.photoURL`로 참조 가능

```tsx
await updateProfile(user, { photoURL: avatarUrl });
```

</details>

<details>
<summary>4. 이미지 하나만 저장하는 방식의 스토리지 관리 전략</summary>

- 동일한 사용자에 대해 **이미지를 덮어쓰기 방식으로 저장**
  - 예: `avatars/abc123` → 새 이미지를 업로드하면 기존 이미지 덮어씀
- 스토리지에 **불필요한 중복 이미지 저장 방지**
  - 비용 절감 및 관리 효율성 향상

</details>

---

### ✅ 전체 흐름 요약

```tsx
// 1. 이미지 선택
const file = e.target.files?.[0];

// 2. 업로드 위치 지정 (유저 ID 기준)
const locationRef = ref(storage, `avatars/${user.uid}`);

// 3. Storage에 업로드
await uploadBytes(locationRef, file);

// 4. 이미지 URL 가져오기
const avatarUrl = await getDownloadURL(locationRef);

// 5. 사용자 프로필 업데이트
await updateProfile(user, { photoURL: avatarUrl });

// 6. 상태 업데이트 → UI 변경
setAvatar(avatarUrl);
```

---

📸 **결과**
- 프로필 화면에서 아바타 이미지를 변경 가능
- Firebase Storage에는 사용자당 **이미지 1개만 저장됨**
- 매번 새 이미지를 업로드해도 기존 이미지를 덮어써 **스토리지 낭비 없음**

</details>

<details>
<summary>📆 2025-04-17 유저 본인의 트윗만 불러오기 (Firestore 필터링)</summary>

### 📌 구현한 기능
- 현재 로그인된 유저의 UID를 기준으로 Firestore의 `tweets` 컬렉션에서 **자신이 작성한 트윗만 조회**
- `useEffect`를 활용하여 마운트 시 `fetchTweets()` 함수 실행
- 필터링 쿼리를 위해 **Firestore 인덱스 생성 작업 필요**

---

### 🔨 사용된 코드 요약

```tsx
useEffect(() => {
  fetchTweets();
}, []);
```

```tsx
const tweetQuery = query(
  collection(database, "tweets"),
  where("userId", "==", user.uid),        // 현재 로그인된 유저의 트윗만 조회
  orderBy("createdAt", "desc"),           // 최신순 정렬
  limit(25)                               // 최대 25개까지만 가져오기
);

const snapshot = await getDocs(tweetQuery);

const tweets = snapshot.docs.map(doc => {
  const { tweet, createdAt, userId, username, photo } = doc.data();
  return {
    id: doc.id,
    tweet,
    createdAt,
    userId,
    username,
    photo,
  };
});

setTweets(tweets);
```

---

### 📘 새롭게 알게 된 개념

<details>
<summary>1. `useEffect(() => { fetchTweets(); }, [])`에서 `[]`의 의미</summary>

- `[]`는 **의존성 배열(Dependency Array)** 로, 비어있을 경우 해당 `useEffect`는 **컴포넌트가 처음 마운트될 때 1회만 실행**됨.
- 이 구조는 **초기 데이터 로딩 시점에 fetch 함수 호출**을 할 때 자주 사용됨.
- `fetchTweets()`를 반복해서 호출하지 않도록 막는 안전장치 역할.

</details>

<details>
<summary>2. Firestore `where()` + `orderBy()`를 함께 사용한 쿼리 필터링</summary>

- `where()`은 Firestore에서 특정 필드 기준으로 **조건을 걸어 필터링**할 수 있는 함수

```tsx
where("userId", "==", user.uid)
```

- `orderBy()`는 정렬 기준을 지정하는 함수
- `limit()`은 가져올 문서 수 제한

> 조합 예시:
```tsx
query(
  collection(database, "tweets"),
  where("userId", "==", user.uid),
  orderBy("createdAt", "desc"),
  limit(25)
);
```

</details>

<details>
<summary>3. Firestore 쿼리 조건에 따라 **인덱스 생성이 필요**할 수 있음</summary>

- Firestore는 매우 유연한 구조를 제공하지만, **복합 필터링(where + orderBy)** 시 **인덱스 생성이 필요**함
- 쿼리를 처음 실행하면 Firebase 콘솔에서 "인덱스를 만들어야 한다"는 에러와 함께 **자동 생성 링크가 제공됨**
- 이 링크를 클릭하여 **해당 조건에 맞는 인덱스를 수동 생성해야 함**
- 생성 이후에는 **해당 조건 쿼리가 자유롭게 작동**함

> ✅ 인덱스 생성은 **한 번만 하면 이후 앱 전체에서 계속 사용할 수 있음**

---

### 🔁 쿼리 조건 정리

| 조건 구문 | 의미 |
|-----------|------|
| `where("userId", "==", user.uid)` | `userId`가 현재 로그인 유저와 같은 문서만 조회 |
| `orderBy("createdAt", "desc")` | 최신 순으로 정렬 |
| `limit(25)` | 최대 25개의 트윗만 가져옴 |

---
</details>

### ✅ 최종 결과

- 프로필 화면에서 해당 유저가 작성한 트윗만 필터링하여 표시 가능
- 필터링 쿼리 동작을 위해 Firestore 인덱스 자동 생성 경험
- `Tweet` 컴포넌트를 재사용하여 동일 UI 구성 완료

</details>