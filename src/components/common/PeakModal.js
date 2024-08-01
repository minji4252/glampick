import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CeoActionButton, CeoButton } from "../../components/common/Button";
import MainCalendar from "../../components/MainCalendar";
import { colorSystem } from "../../styles/color";

const WrapStyle = styled.div`
  border: 2px solid ${colorSystem.ceo};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 700px;
  background: ${colorSystem.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    width: 100%;
    margin-top: 50px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    margin-bottom: 65px;
    text-align: center;
  }

  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .submit-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 50px;
      button {
        width: 30%;
      }
    }
  }
`;

const CeoBoxStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 30px;

  label {
    font-weight: 600;
    color: ${colorSystem.g800};
    margin-bottom: 10px;
  }

  input {
    max-width: 240px;
    width: 100%;
    border: 0px;
    background-color: ${colorSystem.g100};
    height: 40px;
    border-radius: 10px;
    padding: 15px;
  }

  span {
    position: absolute;
    bottom: 7px;
    color: ${colorSystem.error};
    font-size: 0.8rem;
    margin-left: 10px;
    font-weight: 600;
  }

  .cost-group {
    display: flex;
    gap: 10px;
    align-items: center;

    input {
      max-width: 120px;
    }
  }

  .datepicker-custom {
    font-size: 0.85rem;
  }

  .react-datepicker__input-container {
    max-width: 215px;
  }

  .react-datepicker__close-icon::after {
    background-color: ${colorSystem.ceo};
  }
`;

const PeakModal = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState([]);

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const handleKeyDown = e => {
    e.preventDefault();
  };

  // 폼의 초기값
  const initState = {
    RoomName: "",
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    RoomName: yup.string().required("글램핑장 이름을 입력해 주세요"),
    addCost: yup
      .string()
      .required("1인 추가 요금을 입력해 주세요")
      .min(4, "최소 금액은 1000원입니다")
      .max(6, "최대 금액을 초과하였습니다"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: initState,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // 추가 요금 숫자 입력 처리
  const handleChangeAddCost = e => {
    const cost = e.target.value.replace(/[^\d]/g, "");
    setValue("addCost", cost, { shouldValidate: true });
    trigger("addCost");
  };

  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
    const sendData = {
      ...data,
      glampPhone: data.glampPhone.replaceAll("-", ""),
    };
    console.log("전송시 데이터 sendData ", sendData);
  };

  return (
    <WrapStyle>
      <h3>성수기 & 주말 요금 설정</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 성수기 기간 설정 */}
        <CeoBoxStyle>
          <label>성수기 기간 설정</label>
          <MainCalendar
            selectedDate={selectedDate}
            setSelectedDate={handleDateSelect}
            onKeyDown={handleKeyDown}
          />
        </CeoBoxStyle>

        {/* 성수기 추가 요금 */}
        <CeoBoxStyle>
          <label htmlFor="peakCost">성수기 추가 요금 비율</label>
          <div className="cost-group">
            <input
              className="cost-input"
              type="text"
              id="peakCost"
              autoComplete="off"
              {...register("peakCost")}
              // onChange={handleChangeAddCost}
              placeholder="10"
            />
            <p>%</p>
          </div>
          {errors.peakCost && <span>{errors.peakCost.message}</span>}
        </CeoBoxStyle>

        {/* 주말 추가 요금 */}
        <CeoBoxStyle>
          <label htmlFor="peakCost">주말 추가 요금 비율</label>
          <div className="cost-group">
            <input
              className="cost-input"
              type="text"
              id="peakCost"
              autoComplete="off"
              {...register("peakCost")}
              // onChange={handleChangeAddCost}
              placeholder="10"
            />
            <p>%</p>
          </div>
          {errors.peakCost && <span>{errors.peakCost.message}</span>}
        </CeoBoxStyle>

        <div className="submit-btn">
          <CeoButton label="등록하기" />
          <CeoActionButton label="닫기" onClick={onClose} />
        </div>
      </form>
    </WrapStyle>
  );
};

export default PeakModal;
