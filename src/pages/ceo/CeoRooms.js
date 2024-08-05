import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import * as yup from "yup";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoButton } from "../../components/common/Button";
import { colorSystem, size } from "../../styles/color";

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

  form {
    max-width: 800px;
    width: 100%;

    .submit-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
      button {
        width: 30%;
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

  > div {
  }

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
  }

  .room-img-label {
    margin-bottom: 0;
  }

  .glamp-address-div {
    display: flex;
    gap: 15px;
    input {
      cursor: pointer;
      caret-color: transparent;
    }
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
    max-width: 45px !important;
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

    &.selected {
      background-color: ${colorSystem.primary};
      color: ${colorSystem.white};
    }
  }
`;

const CeoRooms = () => {
  const [images, setImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // 폼의 초기값
  const initState = {
    RoomName: "",
    images: [],
    glampIntro: "",
    glampPhone: "",
    roomCost: "",
    peopleMinNum: "",
    peopleMaxNum: "",
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    RoomName: yup.string().required("글램핑장 이름을 입력해 주세요"),
    images: yup.array().min(1, "글램핑장 대표사진을 등록해 주세요"),
    glampPhone: yup.string().required("글램핑장 연락처를 입력해 주세요"),
    roomCost: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(9999998, "최대 범위를 초과하였습니다"),
    peopleMinNum: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(98, "최대 범위를 초과하였습니다"),
    peopleMaxNum: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("숫자를 입력해 주세요")
      .max(98, "최대 범위를 초과하였습니다"),
  });

  // ---------------------------------이미지----------------------------------------

  // 추가된 이미지 개수와 전체 등록 가능한 이미지 개수 상태 추가
  const maxImageCount = 10;
  const [uploadedImageCount, setUploadedImageCount] = useState(images.length);

  // 이미지 업로드 상태 추가
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // 이미지 업로드
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    // 이미지가 현재 배열에 있는 이미지 개수를 더해 3장 이하로 제한
    if (images.length + files.length > maxImageCount) {
      alert(`이미지는 최대 ${maxImageCount}장까지 등록 가능합니다.`);
      return;
    }
    const newImages = [
      ...images,
      ...files.slice(0, maxImageCount - images.length),
    ];
    setImages(newImages);
    setUploadedImageCount(newImages.length);
    setIsImageUploaded(true);
    setValue("images", newImages, { shouldValidate: true });
    trigger("images");
  };

  // 이미지 삭제
  const handleImageDelete = index => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setUploadedImageCount(updatedImages.length);
    setIsImageUploaded(updatedImages.length > 0);
    setValue("images", updatedImages, { shouldValidate: true });
    trigger("images");
  };

  // -----------------------------------------------------------------------------

  //------------------------- form관련 ------------------------------------

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

  // 숫자만 입력 가능
  const handleOnlyNumber = (e, fieldName, totalNum) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value !== "") {
      value = Math.max(0, Math.min(totalNum, Number(value))).toString();
    }
    setValue(fieldName, value, { shouldValidate: true });
    trigger(fieldName);
  };

  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
    const sendData = {
      ...data,
      glampPhone: data.glampPhone.replaceAll("-", ""),
    };
    console.log("전송시 데이터 sendData ", sendData);
  };

  // 이미지 유효성검사 포커스
  useEffect(() => {
    if (errors.images) {
      document
        .querySelector(".room-img-box")
        ?.scrollIntoView({ block: "center" });
    }
  }, [errors.images]);

  // -----------------------------------------------------------------------------

  const handleOptionClick = option => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter(opt => opt !== option)
        : [...prevOptions, option],
    );
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>객실 등록</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 객실 이름 */}
          <CeoBoxStyle>
            <label htmlFor="RoomName">객실 이름</label>
            <input
              type="text"
              id="RoomName"
              autoComplete="off"
              {...register("RoomName")}
            />
            {errors.RoomName && <span>{errors.RoomName.message}</span>}
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
                {images.map((image, index) => (
                  <div key={index} className="uploaded-image">
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
            {errors.images && <span>{errors.images.message}</span>}
          </CeoBoxStyle>

          {/* 객실 가격 */}
          <CeoBoxStyle>
            <label htmlFor="roomCost">객실 가격</label>
            <div className="number-group">
              <input
                className="number-input"
                type="text"
                id="roomCost"
                autoComplete="off"
                {...register("roomCost")}
                onChange={e => handleOnlyNumber(e, "roomCost", 9999999)}
              />
              <p>원</p>
            </div>

            {errors.roomCost && <span>{errors.roomCost.message}</span>}
          </CeoBoxStyle>

          {/* 객실 기준 인원 */}
          <CeoBoxStyle>
            <label htmlFor="peopleMinNum">객실 기준 인원</label>
            <PeopleNumberStyle>
              <div className="number-group">
                <p>최소</p>
                <input
                  className="number-input"
                  type="text"
                  id="peopleMinNum"
                  autoComplete="off"
                  {...register("peopleMinNum")}
                  onChange={e => handleOnlyNumber(e, "peopleMinNum", 99)}
                />
                <p>인</p>
              </div>
              <p>~</p>
              <div className="number-group">
                <p>최대</p>
                <input
                  className="number-input"
                  type="text"
                  id="peopleMaxNum"
                  autoComplete="off"
                  {...register("peopleMaxNum")}
                  onChange={e => handleOnlyNumber(e, "peopleMaxNum", 99)}
                />
                <p>인</p>
              </div>
            </PeopleNumberStyle>
            {errors.peopleMinNum && <span>{errors.peopleMinNum.message}</span>}
            {errors.peopleMaxNum && <span>{errors.peopleMaxNum.message}</span>}
          </CeoBoxStyle>

          {/* 입 퇴실 시간 */}
          <CeoBoxStyle>
            <label htmlFor="peopleNum">입 · 퇴실 시간</label>
            <CheckInRoomStyle>
              <div className="number-group">
                <label htmlFor="checkIn">입실</label>
                <select id="checkIn">
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
                <label htmlFor="checkOut">퇴실</label>
                <select id="checkOut">
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
            {errors.peopleNum && <span>{errors.peopleNum.message}</span>}
          </CeoBoxStyle>

          {/* 객실 옵션 */}
          <CeoBoxStyle>
            <label htmlFor="RoomOption">객실 옵션 (선택) </label>
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
                  className={`option ${selectedOptions.includes(option) ? "selected" : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </p>
              ))}
            </RoomOptionStyle>
            {errors.RoomOption && <span>{errors.RoomOption.message}</span>}
          </CeoBoxStyle>

          <div className="submit-btn">
            <CeoButton label="등록하기" />
          </div>
        </form>
      </div>
    </WrapStyle>
  );
};

export default CeoRooms;
