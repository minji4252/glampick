import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CeoActionButton, CeoButton } from "./Button";
import MainCalendar from "../MainCalendar";
import { colorSystem } from "../../styles/color";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const WrapStyle = styled.div`
  border: 2px solid ${colorSystem.ceo};
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  background: ${colorSystem.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    width: 100%;
    margin-top: 70px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    margin-bottom: 90px;
    text-align: center;
  }

  form {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .submit-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 60px;
      button {
        width: 30%;
      }
    }
  }

  .ceobox-group {
    width: 100%;
    input {
      text-align: center;
    }
  }

  .close-btn {
    background-color: transparent;
    border: 0;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
      color: ${colorSystem.g800};
    }
  }

  .reset-btn {
    position: absolute;
    top: 60px;
    right: 100px;
    background-color: transparent;
    border: 0;
  }
`;

const CeoBoxStyle = styled.div`
  width: 100%;
  height: 126px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 20px;

  label {
    font-weight: 600;
    color: ${colorSystem.g800};
    margin-bottom: 10px;
  }

  input {
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
    font-weight: 600;
  }

  .cost-group {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;

    input {
      max-width: 140px;
    }
  }

  .datepicker-custom {
    font-size: 0.85rem;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__close-icon::after {
    background-color: ${colorSystem.ceo};
  }
`;

const PeakModal = ({ onClose, ceoAccessToken }) => {
  const [selectedDate, setSelectedDate] = useState([]);

  const handleDateSelect = date => {
    setSelectedDate(date);
    setValue("peakPeriod", date, { shouldValidate: true });
    trigger("peakPeriod");
  };

  const handleKeyDown = e => {
    e.preventDefault();
  };

  // 폼의 초기값
  const initState = {
    peakCost: "",
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    peakPeriod: yup
      .array()
      .of(yup.date().required("날짜를 선택해 주세요"))
      .min(2, "시작 날짜와 종료 날짜를 선택해 주세요")
      .required("날짜를 선택해 주세요"),
    peakCost: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(998, "최대 범위를 초과하였습니다"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initState,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // 추가 요금 숫자 입력 처리
  const handleOnlyNumber = (e, fieldName) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value !== "") {
      value = Math.max(0, Math.min(999, Number(value))).toString();
    }
    setValue(fieldName, value, { shouldValidate: true });
    trigger(fieldName);
  };

  const onSubmit = async data => {
    if (selectedDate.length < 2) {
      setError("peakPeriod", {
        type: "manual",
        message: "성수기 기간을 선택해 주세요",
      });
      return;
    }

    const formatDate = date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const peakStartDay = formatDate(selectedDate[0]);
    const peakEndDay = formatDate(selectedDate[1]);
    console.log(peakStartDay, peakEndDay);

    try {
      if (!ceoAccessToken) return;

      // 임시
      const grampId = 2;
      const response = await axios.patch(
        `/api/owner/room/${grampId}/peak?peakStartDay=${peakStartDay}&peakEndDay=${peakEndDay}&peakCost=${data.peakCost}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        },
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <WrapStyle>
      <h3>성수기 설정</h3>
      <button className="close-btn" type="button" onClick={onClose}>
        <IoClose />
      </button>
      <button className="reset-btn" type="button">
        <CeoActionButton label="초기화" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 성수기 기간 설정 */}
        <CeoBoxStyle>
          <label>성수기 기간 설정</label>
          <MainCalendar
            selectedDate={selectedDate}
            setSelectedDate={handleDateSelect}
            onKeyDown={handleKeyDown}
          />
          {errors.peakPeriod && <span>{errors.peakPeriod.message}</span>}
        </CeoBoxStyle>

        <div className="ceobox-group">
          {/* 성수기 추가 요금 */}
          <CeoBoxStyle>
            <label htmlFor="peakCost">성수기 추가 요금</label>
            <div className="cost-group">
              <input
                className="cost-input"
                type="text"
                id="peakCost"
                autoComplete="off"
                {...register("peakCost")}
                onChange={e => handleOnlyNumber(e, "peakCost")}
                placeholder="10"
              />
              <p>%</p>
            </div>
            {errors.peakCost && <span>{errors.peakCost.message}</span>}
          </CeoBoxStyle>
        </div>

        <div className="submit-btn">
          <CeoButton label="등록하기" />
          <CeoActionButton label="닫기" onClick={onClose} />
        </div>
      </form>
    </WrapStyle>
  );
};

export default PeakModal;
