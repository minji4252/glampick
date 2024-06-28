import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// ts에서는 데이터 종류를 구별
// as는 강제로 타입지정
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
  </>,
);
