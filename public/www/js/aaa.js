// function kakaopay() {
//   if (inputH.value == null || inputH.value == "none" || inputH.value == "") {
//     alert("결제 개월 수를 선택 해 주세요");
//     return;
//   }

//   console.log($("#userid"));
//   var IMP = window.IMP;
//   IMP.init("imp10657444");
//   IMP.request_pay(
//     {
//       pg: "kakaopay.TC0ONETIME",
//       pay_method: "card",
//       merchant_uid: "merchant_" + new Date().getTime(), //주문번호
//       name: "GOOTTFLEX", //상품명
//       amount: $(".amountValue").val(), //가격
//       //customer_uid : buyer_name + new Date().getTime(),  //해당 파라미터값이 있어야 빌링 키 발급 시도
//       buyer_email: $(".sessionuserID").val(), //구매자 이메일
//       buyer_name: "buyer_name", //구매자 이름
//       buyer_tel: "hp", //전화번호
//       buyer_addr: "addr", //주소
//       buyer_postcode: "123-456", //우편번호
//     },
//     function (data) {
//       if (data.success) {
//         var msg = "결제 완료";
//         msg += "고유ID : " + data.imp_uid; //아임포트 uid는 실제 결제 시 결제 고유번호를 서버와 비교해서 결제처리하는데 필요없긴함.
//         msg += "// 상점 거래ID : " + data.merchant_uid;
//         msg += "// 결제 금액 : " + data.paid_amount;
//         msg += "// 카드 승인번호 : " + data.apply_num;

//         $.ajax({
//           type: "post",
//           url: "/paySuccess",
//           data: { ID: data.buyer_email, amount: data.paid_amount },
//         });
//       } else {
//         var msg = "결제 실패";
//         msg += "에러 내용" + rsp.error_msg;
//       }
//       alert(msg);
//       document.location.href = "/video/list";
//     },
//   );
// }

// /* eslint-env jquery */
