import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./components/common/ScrollTop";
import "./index.css";
import { RecoilRoot } from "recoil";
// ts에서는 데이터 종류를 구별
// as는 강제로 타입지정
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </RecoilRoot>  
);
