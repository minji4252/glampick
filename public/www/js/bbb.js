/* 결제 모달 창 - 02.14 */
const closebtn = document.querySelector(".closebtn");
const popup = document.querySelector(".popup");
const inputH = document.querySelector(".inputMonthH"); //결제 개월 수 입력받는 inputhidden
const amount = document.querySelector(".amount");
const amountV = document.querySelector(".amountValue");

function modal() {
  //결제창 on-off
  popup.style.display = "block";
}
closebtn.addEventListener("click", function () {
  popup.style.display = "none";
});

//결제 개월 수 view에 hidden으로 출력
function monthSelect(e) {
  const paynum = 1000 * e.value;
  inputH.value = e.value;
  amount.textContent = "결제 금액 : " + paynum + "원";
  amountV.value = paynum;
}
