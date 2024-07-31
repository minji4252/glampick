import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { useEffect, useState } from "react";
import { CeoButton } from "../../components/common/Button";
import { FaCamera } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  .glamp-img-box {
    /* height: 300px; */
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
    display: flex;
    gap: 15px;
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

  .add-cost-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .add-cost-input {
    max-width: 120px;
  }

  .glamp-img-label {
    margin-bottom: 0;
  }

  .glamp-address-div {
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
  gap: 10px;
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
    left: 125px;
    top: -1px;
    border: 2px dashed ${colorSystem.g150};
    width: 300px;
    height: 200px;
    border-radius: 5px;
  }

  .uploaded-images {
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 300px;
      height: 200px;
      border-radius: 5px;
      object-fit: cover;
      margin-left: 20px;
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

const CeoGlamping = () => {
  const [images, setImages] = useState([]);

  // 폼의 초기값
  const initState = {
    glampName: "",
    images: [],
    glampIntro: "",
    infoBasic: "",
    infoNotice: "",
    glampAddress: "",
    glampElseAddress: "",
    glampPhone: "",
    traffic: "",
    addCost: "",
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    glampName: yup.string().required("글램핑장 이름을 입력해 주세요"),
    images: yup.array().min(1, "글램핑장 대표사진을 등록해 주세요"),
    glampIntro: yup.string().required("숙소 소개 항목을 입력해 주세요"),
    infoBasic: yup.string().required("숙소 기본정보를 입력해 주세요"),
    infoNotice: yup.string().required("숙소 유의사항을 입력해 주세요"),
    glampAddress: yup.string().required("글램핑장 주소를 입력해 주세요"),
    glampElseAddress: yup.string().required("글램핑장 주소를 입력해 주세요"),
    glampPhone: yup.string().required("글램핑장 연락처를 입력해 주세요"),
    traffic: yup.string().required("글램핑장 주변 관광지 정보를 입력해 주세요"),
    addCost: yup
      .string()
      .required("1인 추가 요금을 입력해 주세요")
      .min(4, "최소 금액은 1000원입니다")
      .max(6, "최대 금액을 초과하였습니다"),
  });

  // ---------------------------------이미지----------------------------------------

  // 추가된 이미지 개수와 전체 등록 가능한 이미지 개수 상태 추가
  const maxImageCount = 1;
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

  // Daum Post 팝업
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("glampAddress", fullAddress);
  };

  const handleClick = e => {
    e.preventDefault();
    open({
      onComplete: handleComplete,
      left: Math.ceil((window.screen.width - 500) / 2),
      top: Math.ceil((window.screen.height - 500) / 2),
    });
  };

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

  // 전화번호 자동 변경
  const handleChangePhone = e => {
    const phoneNumber = formatPhoneNumber(e.target.value);
    setValue("glampPhone", phoneNumber, { shouldValidate: true });
    trigger("glampPhone");
  };

  const formatPhoneNumber = value => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

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

  // 이미지 유효성검사 포커스
  useEffect(() => {
    if (errors.images) {
      document
        .querySelector(".glamp-img-box")
        ?.scrollIntoView({ block: "center" });
    }
  }, [errors.images]);

  // -----------------------------------------------------------------------------

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>글램핑장 등록</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 글램핑장 이름 */}
          <CeoBoxStyle>
            <label htmlFor="glampName">글램핑장 이름</label>
            <input
              type="text"
              id="glampName"
              autoComplete="off"
              {...register("glampName")}
              placeholder="글램핑장 이름"
            />
            {errors.glampName && <span>{errors.glampName.message}</span>}
          </CeoBoxStyle>

          {/* 글램핑장 사진 */}
          <CeoBoxStyle className="glamp-img-box">
            <label className="glamp-img-label">글램핑장 사진</label>
            <h4>대표사진 1장을 등록해주세요</h4>
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

          {/* 숙소 소개 */}
          <CeoBoxStyle>
            <label htmlFor="glampIntro">숙소 소개</label>
            <textarea
              id="glampIntro"
              {...register("glampIntro")}
              placeholder="바다앞에 위치한 글램핑장 입니다"
            />
            {errors.glampIntro && <span>{errors.glampIntro.message}</span>}
          </CeoBoxStyle>

          {/* 숙소 기본정보 */}
          <CeoBoxStyle>
            <label htmlFor="infoBasic">숙소 기본정보</label>
            <textarea
              id="infoBasic"
              {...register("infoBasic")}
              placeholder="전 객실 금연"
            />
            {errors.infoBasic && <span>{errors.infoBasic.message}</span>}
          </CeoBoxStyle>

          {/* 숙소 유의사항 */}
          <CeoBoxStyle>
            <label htmlFor="infoNotice">숙소 유의사항</label>
            <textarea
              id="infoNotice"
              {...register("infoNotice")}
              placeholder="화기 사용 금지"
            />
            {errors.infoNotice && <span>{errors.infoNotice.message}</span>}
          </CeoBoxStyle>

          {/* 글램핑장 주소 */}
          <CeoBoxStyle>
            <label htmlFor="glampAddress">글램핑장 주소</label>
            <div className="glamp-address-div">
              <input
                type="text"
                id="glampAddress"
                {...register("glampAddress")}
                onClick={handleClick}
              />
              <CeoButton label="주소검색" onClick={handleClick} />
            </div>
            <input
              type="text"
              {...register("glampElseAddress")}
              placeholder="상세주소를 입력하세요"
            />
            {errors.glampAddress && <span>{errors.glampAddress.message}</span>}
            {errors.glampElseAddress && (
              <span>{errors.glampElseAddress.message}</span>
            )}
          </CeoBoxStyle>

          {/* 글램핑장 연락처 */}
          <CeoBoxStyle>
            <label htmlFor="glampPhone">글램핑장 연락처</label>
            <input
              type="text"
              id="glampPhone"
              autoComplete="off"
              {...register("glampPhone")}
              onChange={handleChangePhone}
              placeholder="010-0000-0000"
            />
            {errors.glampPhone && <span>{errors.glampPhone.message}</span>}
          </CeoBoxStyle>

          {/* 주변 관광지 */}
          <CeoBoxStyle>
            <label htmlFor="traffic">주변 관광지</label>
            <textarea
              placeholder="해수욕장 도보 3분"
              id="traffic"
              {...register("traffic")}
            />
            {errors.traffic && <span>{errors.traffic.message}</span>}
          </CeoBoxStyle>

          {/* 1인 추가 요금*/}
          <CeoBoxStyle>
            <label htmlFor="addCost">1인 추가 요금</label>
            <div className="add-cost-group">
              <input
                className="add-cost-input"
                type="text"
                id="addCost"
                autoComplete="off"
                {...register("addCost")}
                onChange={handleChangeAddCost}
                placeholder="10000"
              />
              <p>원</p>
            </div>
            {errors.addCost && <span>{errors.addCost.message}</span>}
          </CeoBoxStyle>

          <div className="submit-btn">
            <CeoButton label="승인 요청" />
          </div>
        </form>
      </div>
    </WrapStyle>
  );
};

export default CeoGlamping;
