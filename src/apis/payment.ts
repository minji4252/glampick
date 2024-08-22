import axios from "axios";
import { Navigate } from "react-router-dom";

declare global {
  interface Window {
    IMP: any;
  }
}

//카카오페이
export const kakaopayMethod = (amount: number, buyerName: string): void => {
  const IMP = window.IMP;
  IMP.init("imp10657444");
  IMP.request_pay(
    {
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: "GPK_" + new Date().getTime(),
      name: "글램픽 결제",
      amount: amount,
      buyer_name: buyerName,
    },
    (data: {
      success: boolean;
      merchant_uid: string;
      paid_amount: number;
      buyer_name: string;
      buyer_email: string;
      error_msg: string;
    }) => {
      let msg: string;
      if (data.success) {
        msg = "결제 완료";
        msg += "// 결제 수단 : Kakao";
        msg += "// 상점 거래ID : " + data.merchant_uid;
        msg += "// 결제 금액 : " + data.paid_amount;
        msg += "// 구매자 이름 : " + data.buyer_name;

        axios
          .post("/api/order/", {
            ID: data.buyer_email,
            amount: data.paid_amount,
          })
          .then(response => {
            alert("결제 완료: " + response.data.message);
          })
          .catch(error => {
            alert("결제 성공 후 처리 중 오류: " + error.message);
          });
      } else {
        msg = "결제 실패";
        msg += "에러 내용: " + data.error_msg;
        alert(msg);
      }
    },
  );
};
