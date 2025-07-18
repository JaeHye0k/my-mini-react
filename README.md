## ✅ 전체 프로젝트 구조

```
my-mini-react/
├── packages/
│   ├── compiler/        // JSX → JS로 컴파일하는 컴파일러
│   └── core/            // React-like core 라이브러리
├── examples/            // 사용 예제 (JSX 코드 작성 위치)
├── public/              // index.html
├── dist/                // 컴파일된 결과물
├── scripts/             // dev server 및 빌드 스크립트
├── package.json
├── .babelrc             // (선택) 바벨 설정
└── README.md
```

---

## 1단계: React 라이브러리 구현 (packages/core)

### ✅ 목표

-   `React.createElement`와 Virtual DOM 트리 생성
-   `render` 함수로 DOM에 그리기
-   상태 기능(`useState` 유사 기능) 및 리렌더링 처리

### 📌 구현 순서

1. **React.createElement**

    - JSX를 JS로 바꾸면 결국 이걸 호출하게 될 것
    - `React.createElement(type, props, ...children)` 구조
    - 리턴값은 Virtual DOM 객체

2. **render 함수**

    - Virtual DOM → 실제 DOM으로 변환
    - 루트 DOM에 append

3. **diff & patch 로직은 생략**

    - 처음에는 리렌더 시 전체 리렌더링으로 시작 (성능보다 단순성 우선)

4. **useState 기능**

    - 상태 저장 배열 구현
    - 상태 변경 시 전체 render 다시 호출

5. **render 함수 재호출 관리**

    - 상태 변경 시 `rerender()` 트리거

---

## 2단계: JSX 컴파일러 구현 (packages/compiler)

### ✅ 목표

-   `.jsx` 파일을 `.js`로 변환
-   `JSX → React.createElement(...)` 파싱
-   `npm start` 시 자동 컴파일

### 📌 구현 방식

1. **JSX → JS 트랜스파일러**

    - Babel 플러그인 직접 작성 or Babel CLI로 변환
    - JSX 노드를 `React.createElement(...)` 호출로 변환

2. **watch 기능 추가**

    - `chokidar` 등으로 `.jsx` 파일 변경 감지
    - 변경 시 자동 컴파일

3. **CLI 명령어 작성**

    - `npm start` → JSX 컴파일 + 서버 실행

---

## 3단계: Dev Server 구현 (scripts/dev-server.js)

### ✅ 목표

-   `npm start`로 프로젝트 실행
-   `localhost:9999`에 HTML 및 컴파일된 JS 제공

### 📌 구현 방식

-   `express` 또는 `http` 내장 모듈로 서버 구성
-   정적 파일 서빙 (public/index.html + dist/bundle.js)
-   포트: 9999
-   브라우저 자동 열기(optional)

---

## 기대 동작 플로우

1. `examples/App.jsx`에 JSX 코드 작성
2. `npm start` 실행 시:

    - JSX → JS로 컴파일되어 `dist/App.js`에 저장
    - `public/index.html`이 `dist/App.js`를 로딩
    - `localhost:9999` 서버가 열리고 화면 출력됨

---

## 💡 보너스 아이디어 (선택)

-   `useEffect` 유사 기능 구현
-   JSX → TSX 지원
-   컴파일러 대신 `esbuild`, `vite` 사용해서 비교
-   HMR(Hot Module Reloading) 구현해보기

---

## 📌 예상 기술 스택

-   Core: JavaScript (ES6+)
-   Compiler: Babel (or 직접 AST 파서)
-   Dev Server: Node.js + Express or native HTTP
-   Bundler (선택): Rollup or esbuild

---

## 💥 예시 코드

### `App.jsx`

```jsx
function App() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onclick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### JSX → JS 컴파일 결과

```js
function App() {
    const [count, setCount] = React.useState(0);
    return React.createElement(
        "div",
        null,
        React.createElement("h1", null, `Count: ${count}`),
        React.createElement("button", { onclick: () => setCount(count + 1) }, "Increment"),
    );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

---

### 다음 단계 추천:

-   [ ] `packages/core/index.js`에 createElement → render → useState 순으로 구현
-   [ ] `packages/compiler/index.js`에서 Babel 기반 JSX 컴파일러 작성
-   [ ] `npm start`로 컴파일 + 서버 실행 스크립트 작성

---

**Q1:** JSX를 직접 AST로 파싱해 React.createElement를 만들려면 Babel 없이 어떻게 구현할 수 있을까?

**Q2:** 상태가 변경될 때마다 전체 트리를 다시 렌더링하는 방식에서 성능 최적화를 위해 어떤 개선을 도입할 수 있을까?

**Q3:** React의 `reconciliation` 알고리즘을 단순화해 직접 구현한다면 어떤 방식으로 시작할 수 있을까?
