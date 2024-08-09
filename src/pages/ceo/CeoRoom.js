import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import * as yup from "yup";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoActionButton, CeoButton } from "../../components/common/Button";
import { colorSystem, size } from "../../styles/color";
import useFetchAccessToken from "../../utils/CeoAccessToken";
import { useLocation, useParams } from "react-router-dom";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    margin-bottom: 65px;
  }

  em {
    color: ${colorSystem.g400};
    margin-left: 5px;
    font-weight: 500;
  }

  form {
    max-width: 800px;
    width: 100%;

    .submit-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 60px;
      margin-bottom: 30vh;
      button {
        width: 30%;
        height: 50px;
        font-size: 1.1rem;
      }
    }
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
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

  input,
  textarea {
    max-width: 640px;
    width: 100%;
    border: 0px;
    background-color: ${colorSystem.g100};
    height: 40px;
    border-radius: 10px;
    padding: 15px;
  }

  textarea {
    height: 140px;
    resize: none;
  }

  h4 {
    color: ${colorSystem.placeholder};
  }

  span {
    position: absolute;
    bottom: 7px;
    color: ${colorSystem.error};
    font-size: 0.8rem;
    margin-left: 10px;
    font-weight: 600;
  }

  .number-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .number-input {
    max-width: 150px;
    text-align: center;
  }

  .room-img-label {
    margin-bottom: 0;
  }

  .weekday-error {
    margin-left: 40px;
  }

  .weekend-error {
    margin-left: 265px;
  }

  .peopleNum-error {
    margin-left: 0px;
  }

  .peopleMax-error {
    margin-left: 150px;
  }
`;

const ImageUploadStyle = styled.div`
  position: relative;
  height: 200px;
  margin-top: 20px;
  display: flex;
  gap: 20px;
  align-items: center;

  input {
    display: none;
  }

  .upload-label {
    position: relative;
    padding: 10px 20px;
    width: 90px;
    height: 90px;
    border: 1px solid ${colorSystem.g200};
    border-radius: 20px;
    background-color: ${colorSystem.white};
    color: ${({ isImageUploaded }) =>
      isImageUploaded ? colorSystem.ceo : colorSystem.g200};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      .camera-img {
        color: ${colorSystem.ceo};
      }
    }
  }

  .image-upload-info {
    display: flex;
    justify-content: center;
  }

  .default-image {
    position: absolute;
    left: 105px;
    top: 0;
    border: 2px dashed ${colorSystem.g150};
    width: 620px;
    height: 195px;
    border-radius: 5px;
  }

  .uploaded-images {
    z-index: 999;
    display: flex;
    align-items: center;
    max-width: 650px;
    flex-wrap: wrap;

    img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      object-fit: cover;
      margin-left: 10px;
    }
  }
  .camera-img {
    width: 80%;
    height: 80%;
    color: ${({ isImageUploaded }) =>
      isImageUploaded ? colorSystem.ceo : colorSystem.g200};
  }
  .delete-image {
    border: none;
    background: none;
    cursor: pointer;
    color: ${colorSystem.ceo};
    font-size: 0.9rem;

    svg {
      margin-left: 10px;
      width: 20px;
      height: 20px;
    }
  }
`;

const PeopleNumberStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    max-width: 65px !important;
    width: 100%;
  }
`;

const CheckInRoomStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    margin-bottom: 1px;
    margin-right: 7px;
  }

  .number-group {
    gap: 5px;
  }
`;

const RoomOptionStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: ${colorSystem.g600};

  .option {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 100px;
    margin: 5px;
    font-weight: 600;
    transition:
      background-color 0.3s,
      color 0.3s;
    border: 1px solid ${colorSystem.g400};

    &.selected {
      background-color: ${colorSystem.primary};
      color: ${colorSystem.white};
      border: 1px solid transparent;
      font-weight: 500;
    }
  }
`;

const CeoRoom = () => {
  const location = useLocation();
  const [roomImg, setRoomImg] = useState([]);
  const [service, setService] = useState([]);
  const ceoAccessToken = useFetchAccessToken();
  const isEditMode = location.pathname.includes("/edit/");
  const SERVICE_MAPPING = {
    수영장: 1,
    오션뷰: 2,
    마운틴뷰: 3,
    반려동물동반: 4,
    바베큐: 5,
    개별화장실: 6,
    와이파이: 7,
  };

  // 폼의 초기값
  const initState = {
    roomName: "",
    roomImg: [],
    weekdayPrice: "",
    weekendPrice: "",
    peopleNum: "",
    peopleMax: "",
    inTime: "15",
    outTime: "11",
    service: [],
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    roomName: yup.string().required("객실 이름을 입력해 주세요"),
    roomImg: yup.array().min(1, "객실 사진을 등록해 주세요"),
    weekdayPrice: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(9999998, "최대 범위를 초과하였습니다"),
    weekendPrice: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(9999998, "최대 범위를 초과하였습니다"),
    peopleNum: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(98, "최대 범위를 초과하였습니다"),
    peopleMax: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(98, "최대 범위를 초과하였습니다"),
    service: yup.array(),
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

  // ---------------------------------이미지----------------------------------------

  // 추가된 이미지 개수와 전체 등록 가능한 이미지 개수 상태 추가
  const maxImageCount = 10;
  const [uploadedImageCount, setUploadedImageCount] = useState(roomImg.length);

  // 이미지 업로드 상태 추가
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // 이미지 업로드
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    // 이미지가 현재 배열에 있는 이미지 개수를 더해 3장 이하로 제한
    if (roomImg.length + files.length > maxImageCount) {
      alert(`이미지는 최대 ${maxImageCount}장까지 등록 가능합니다.`);
      return;
    }
    const newImages = [
      ...roomImg,
      ...files.slice(0, maxImageCount - roomImg.length),
    ];
    setRoomImg(newImages);
    setUploadedImageCount(newImages.length);
    setIsImageUploaded(true);
    setValue("roomImg", newImages, { shouldValidate: true });
    trigger("roomImg");
  };

  // 이미지 삭제
  const handleImageDelete = index => {
    const updatedImages = [...roomImg];
    updatedImages.splice(index, 1);
    setRoomImg(updatedImages);
    setUploadedImageCount(updatedImages.length);
    setIsImageUploaded(updatedImages.length > 0);
    setValue("roomImg", updatedImages, { shouldValidate: true });
    trigger("roomImg");
  };

  // -----------------------------------------------------------------------------

  const { roomId } = useParams();

  const reverseServiceMapping = Object.keys(SERVICE_MAPPING).reduce(
    (acc, key) => {
      acc[SERVICE_MAPPING[key]] = key;
      return acc;
    },
    {},
  );

  //객실 정보 불러오기
  const getRoomDetails = async (roomId, ceoAccessToken) => {
    try {
      // 글램핑장 id임시
      const response = await axios.get(`/api/owner/room/2/${roomId}`, {
        headers: {
          Authorization: `Bearer ${ceoAccessToken}`,
        },
      });
      const data = response.data;
      setValue("roomName", data.roomName);
      // 금액 임시,추후 수정
      setValue("weekdayPrice", data.price);
      setValue("weekendPrice", data.price);
      setValue("peopleNum", data.peopleNum);
      setValue("peopleMax", data.peopleMax);
      setValue("inTime", data.inTime.split(":")[0]);
      setValue("outTime", data.outTime.split(":")[0]);

      setService(data.service.map(code => reverseServiceMapping[code] || ""));
      setValue(
        "service",
        data.service.map(code => reverseServiceMapping[code] || ""),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (isEditMode && roomId) {
      getRoomDetails(roomId, ceoAccessToken);
    }
  }, [isEditMode, roomId, ceoAccessToken, setValue]);

  //------------------------- form관련 ------------------------------------

  // 숫자만 입력 가능
  const handleOnlyNumber = (e, fieldName, totalNum) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value !== "") {
      value = Math.max(0, Math.min(totalNum, Number(value))).toString();
    }
    setValue(fieldName, value, { shouldValidate: true });
    trigger(fieldName);
  };

  // 이미지 유효성검사 포커스
  useEffect(() => {
    if (errors.roomImg) {
      document
        .querySelector(".room-img-box")
        ?.scrollIntoView({ block: "center" });
    }
  }, [errors.roomImg]);

  //Post 함수
  const onSubmit = async data => {
    const formData = new FormData();

    formData.append(
      "req",
      JSON.stringify({
        // 임시
        glampId: 55,
        roomName: data.roomName,
        weekdayPrice: data.weekdayPrice,
        weekendPrice: data.weekendPrice,
        peopleNum: data.peopleNum,
        peopleMax: data.peopleMax,
        inTime: `${data.inTime}:00:00`,
        outTime: `${data.outTime}:00:00`,
        service: data.service.map(code => SERVICE_MAPPING[code] || code),
      }),
    );

    roomImg.forEach(image => {
      formData.append("roomImg", image, image.name);
    });

    try {
      if (!ceoAccessToken) return;
      console.log("전송 데이터:", formData);

      const response = await axios.post(`api/owner/room`, formData, {
        headers: {
          Authorization: `Bearer ${ceoAccessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // -----------------------------------------------------------------------------

  // 객실 옵션
  useEffect(() => {
    setValue("service", service);
  }, [service, setValue]);

  // 객실 옵션 클릭 시 선택된 옵션의 코드로 변경
  const handleOptionClick = option => {
    setService(prevOptions => {
      const updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter(opt => opt !== option)
        : [...prevOptions, option];

      // 숫자 코드로 변환
      const selectedCodes = updatedOptions.map(opt => SERVICE_MAPPING[opt]);
      setValue("service", selectedCodes);
      return updatedOptions;
    });
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>{isEditMode ? "객실 수정" : "객실 등록"}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 객실 이름 */}
          <CeoBoxStyle>
            <label htmlFor="roomName">객실 이름</label>
            <input
              type="text"
              id="roomName"
              autoComplete="off"
              {...register("roomName")}
            />
            {errors.roomName && <span>{errors.roomName.message}</span>}
          </CeoBoxStyle>

          {/* 객실 사진 */}
          <CeoBoxStyle className="room-img-box">
            <label className="room-img-label">객실 사진</label>
            <h4>최대 10장까지 등록이 가능합니다</h4>
            <ImageUploadStyle isImageUploaded={isImageUploaded}>
              <label htmlFor="imageUpload" className="upload-label">
                <FaCamera className="camera-img" />
                <div className="image-upload-info">
                  <p>
                    {uploadedImageCount}/{maxImageCount}
                  </p>
                </div>
              </label>
              <div className="default-image" />
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="uploaded-images">
                {roomImg.map((image, index) => (
                  <div key={index}>
                    <img src={URL.createObjectURL(image)} alt="uploaded" />
                    <button
                      type="button"
                      className="delete-image"
                      onClick={() => handleImageDelete(index)}
                    >
                      <FiMinusCircle />
                    </button>
                  </div>
                ))}
              </div>
            </ImageUploadStyle>
            {errors.roomImg && <span>{errors.roomImg.message}</span>}
          </CeoBoxStyle>

          {/* 객실 가격 */}
          <CeoBoxStyle>
            <label htmlFor="weekdayPrice">객실 가격</label>
            <div className="number-group">
              <p>평일 </p>
              <input
                className="number-input"
                type="text"
                id="weekdayPrice"
                autoComplete="off"
                {...register("weekdayPrice")}
                onChange={e => handleOnlyNumber(e, "weekdayPrice", 9999999)}
              />
              <p>원,</p>
              <p>주말</p>
              <input
                className="number-input"
                type="text"
                id="weekendPrice"
                autoComplete="off"
                {...register("weekendPrice")}
                onChange={e => handleOnlyNumber(e, "weekendPrice", 9999999)}
              />
              <p>원 </p>
            </div>

            {errors.weekdayPrice && (
              <span className="weekday-error">
                {errors.weekdayPrice.message}
              </span>
            )}
            {errors.weekendPrice && (
              <span className="weekend-error">
                {errors.weekendPrice.message}
              </span>
            )}
          </CeoBoxStyle>

          {/* 객실 기준 인원 */}
          <CeoBoxStyle>
            <label htmlFor="peopleNum">객실 기준 인원</label>
            <PeopleNumberStyle>
              <div className="number-group">
                <p>최소</p>
                <input
                  className="number-input"
                  type="text"
                  id="peopleNum"
                  autoComplete="off"
                  {...register("peopleNum")}
                  onChange={e => handleOnlyNumber(e, "peopleNum", 99)}
                />
                <p>인</p>
              </div>
              <p>-</p>
              <div className="number-group">
                <p>최대</p>
                <input
                  className="number-input"
                  type="text"
                  id="peopleMax"
                  autoComplete="off"
                  {...register("peopleMax")}
                  onChange={e => handleOnlyNumber(e, "peopleMax", 99)}
                />
                <p>인</p>
              </div>
            </PeopleNumberStyle>
            {errors.peopleNum && (
              <span className="peopleNum-error">
                {errors.peopleNum.message}
              </span>
            )}
            {errors.peopleMax && (
              <span className="peopleMax-error">
                {errors.peopleMax.message}
              </span>
            )}
          </CeoBoxStyle>

          {/* 입 퇴실 시간 */}
          <CeoBoxStyle>
            <label htmlFor="peopleNum">입 · 퇴실 시간</label>
            <CheckInRoomStyle>
              <div className="number-group">
                <p>입실</p>
                <select id="inTime" {...register("inTime")}>
                  <option value="09">09 : 00</option>
                  <option value="10">10 : 00</option>
                  <option value="11">11 : 00</option>
                  <option value="12">12 : 00</option>
                  <option value="13">13 : 00</option>
                  <option value="14">14 : 00</option>
                  <option value="15">15 : 00</option>
                  <option value="16">16 : 00</option>
                  <option value="17">17 : 00</option>
                  <option value="18">18 : 00</option>
                  <option value="19">19 : 00</option>
                  <option value="20">20 : 00</option>
                  <option value="21">21 : 00</option>
                  <option value="22">22 : 00</option>
                  <option value="23">23 : 00</option>
                </select>
                <p>시</p>
              </div>
              <p>-</p>
              <div className="number-group">
                <p>퇴실</p>
                <select id="outTime" {...register("outTime")}>
                  <option value="09">09 : 00</option>
                  <option value="10">10 : 00</option>
                  <option value="11">11 : 00</option>
                  <option value="12">12 : 00</option>
                  <option value="13">13 : 00</option>
                  <option value="14">14 : 00</option>
                  <option value="15">15 : 00</option>
                  <option value="16">16 : 00</option>
                  <option value="17">17 : 00</option>
                  <option value="18">18 : 00</option>
                  <option value="19">19 : 00</option>
                  <option value="20">20 : 00</option>
                  <option value="21">21 : 00</option>
                  <option value="22">22 : 00</option>
                  <option value="23">23 : 00</option>
                </select>
                <p>시</p>
              </div>
            </CheckInRoomStyle>
          </CeoBoxStyle>

          {/* 객실 옵션 */}
          <CeoBoxStyle>
            <label htmlFor="RoomOption">
              객실 옵션
              <em>(선택) </em>
            </label>
            <RoomOptionStyle>
              {[
                "바베큐",
                "와이파이",
                "수영장",
                "반려동물동반",
                "마운틴뷰",
                "오션뷰",
                "개별화장실",
              ].map(option => (
                <p
                  key={option}
                  className={`option ${service.includes(option) ? "selected" : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </p>
              ))}
            </RoomOptionStyle>
            {errors.RoomOption && <span>{errors.RoomOption.message}</span>}
          </CeoBoxStyle>

          <div className="submit-btn">
            {isEditMode ? (
              <CeoActionButton label="수정하기" />
            ) : (
              <CeoButton label="등록하기" />
            )}
          </div>
        </form>
      </div>
    </WrapStyle>
  );
};

export default CeoRoom;
