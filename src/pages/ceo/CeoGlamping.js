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
import axios from "axios";
import { useRecoilState } from "recoil";
import { ceoAccessTokenState } from "../../atoms/loginState";
import useFetchAccessToken from "../../utils/CeoAccessToken";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin: 50px 0 65px 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
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

  select {
    max-width: 120px;
    width: 100%;
    height: 40px;
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

  .cost-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .cost-input {
    max-width: 100px;
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
  const [glampImg, setGlampImg] = useState([]);
  const ceoAccessToken = useFetchAccessToken();

  // 폼의 초기값
  const initState = {
    glampName: "",
    glampImg: [],
    region: "seoul",
    intro: "",
    basic: "",
    notice: "",
    glampLocation: "",
    glampCall: "",
    traffic: "",
    extraCharge: "",
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    glampName: yup.string().required("글램핑장 이름을 입력해 주세요"),
    glampImg: yup.array().min(1, "글램핑장 대표사진을 등록해 주세요"),
    intro: yup.string().required("숙소 소개 항목을 입력해 주세요"),
    basic: yup.string().required("숙소 기본정보를 입력해 주세요"),
    notice: yup.string().required("숙소 유의사항을 입력해 주세요"),
    glampLocation: yup.string().required("글램핑장 주소를 입력해 주세요"),
    glampCall: yup.string().required("글램핑장 연락처를 입력해 주세요"),
    traffic: yup.string().required("글램핑장 주변 관광지 정보를 입력해 주세요"),
    extraCharge: yup
      .string()
      .required("1인 추가 요금을 입력해 주세요")
      .max(6, "최대 금액을 초과하였습니다"),
  });

  // ---------------------------------이미지----------------------------------------

  // 추가된 이미지 개수와 전체 등록 가능한 이미지 개수 상태 추가
  const maxImageCount = 1;
  const [uploadedImageCount, setUploadedImageCount] = useState(glampImg.length);

  // 이미지 업로드 상태 추가
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // 이미지 업로드
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    // 이미지가 현재 배열에 있는 이미지 개수를 더해 3장 이하로 제한
    if (glampImg.length + files.length > maxImageCount) {
      alert(`이미지는 최대 ${maxImageCount}장까지 등록 가능합니다.`);
      return;
    }
    const newImages = [
      ...glampImg,
      ...files.slice(0, maxImageCount - glampImg.length),
    ];
    setGlampImg(newImages);
    setUploadedImageCount(newImages.length);
    setIsImageUploaded(true);
    setValue("glampImg", newImages, { shouldValidate: true });
    trigger("glampImg");
  };

  // 이미지 삭제
  const handleImageDelete = index => {
    const updatedImages = [...glampImg];
    updatedImages.splice(index, 1);
    setGlampImg(updatedImages);
    setUploadedImageCount(updatedImages.length);
    setIsImageUploaded(updatedImages.length > 0);
    setValue("glampImg", updatedImages, { shouldValidate: true });
    trigger("glampImg");
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

    setValue("glampLocation", fullAddress);
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

  // 추가 요금 숫자 입력 처리
  const handleOnlyNumber = (e, fieldName) => {
    const cost = e.target.value.replace(/[^\d]/g, "");
    setValue(fieldName, cost, { shouldValidate: true });
    trigger(fieldName);
  };

  //Post 함수
  const onSubmit = async data => {
    const formData = new FormData();

    formData.append(
      "req",
      JSON.stringify({
        glampName: data.glampName,
        region: data.region,
        intro: data.intro,
        basic: data.basic,
        notice: data.notice,
        glampLocation: data.glampLocation,
        glampCall: data.glampCall,
        traffic: data.traffic,
        extraCharge: data.extraCharge,
      }),
    );

    glampImg.forEach(image => {
      formData.append("glampImg", image, image.name);
    });

    try {
      if (!ceoAccessToken) return;
      console.log("전송 데이터:", formData);

      const response = await axios.post(`/api/owner/glamping`, formData, {
        headers: {
          Authorization: `Bearer ${ceoAccessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response.data.code === "SU") {
      //   alert(response.data.message);
      // }
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지 유효성검사 포커스
  useEffect(() => {
    if (errors.glampImg) {
      document
        .querySelector(".glamp-img-box")
        ?.scrollIntoView({ block: "center" });
    }
  }, [errors.glampImg]);

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
                {glampImg.map((image, index) => (
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
            {errors.glampImg && <span>{errors.glampImg.message}</span>}
          </CeoBoxStyle>

          {/* 글램핑장 지역 */}
          <CeoBoxStyle>
            <label htmlFor="region">글램핑장 지역</label>
            <select id="region" {...register("region")}>
              <option value="seoul">서울/경기</option>
              <option value="gangwon">강원</option>
              <option value="chungbuk">충북</option>
              <option value="chungnam">충남</option>
              <option value="gyeongbuk">경북</option>
              <option value="gyeongnam">경남</option>
              <option value="jeonbuk">전북</option>
              <option value="jeonnam">전남</option>
              <option value="jeju">제주</option>
            </select>
            {errors.region && <span>{errors.region.message}</span>}
          </CeoBoxStyle>

          {/* 글램핑장 주소 */}
          <CeoBoxStyle>
            <label htmlFor="glampLocation">글램핑장 주소</label>
            <div className="glamp-address-div">
              <input
                type="text"
                id="glampLocation"
                {...register("glampLocation")}
                onClick={handleClick}
              />
              <CeoButton label="주소검색" onClick={handleClick} />
            </div>
            {errors.glampLocation && (
              <span>{errors.glampLocation.message}</span>
            )}
          </CeoBoxStyle>

          {/* 글램핑장 연락처 */}
          <CeoBoxStyle>
            <label htmlFor="glampCall">글램핑장 연락처</label>
            <input
              type="text"
              id="glampCall"
              autoComplete="off"
              {...register("glampCall")}
              onChange={e => handleOnlyNumber(e, "glampCall")}
            />
            {errors.glampCall && <span>{errors.glampCall.message}</span>}
          </CeoBoxStyle>

          {/* 숙소 소개 */}
          <CeoBoxStyle>
            <label htmlFor="intro">숙소 소개</label>
            <textarea
              id="intro"
              {...register("intro")}
              placeholder="바다앞에 위치한 글램핑장 입니다"
            />
            {errors.intro && <span>{errors.intro.message}</span>}
          </CeoBoxStyle>

          {/* 숙소 기본정보 */}
          <CeoBoxStyle>
            <label htmlFor="basic">숙소 기본정보</label>
            <textarea
              id="basic"
              {...register("basic")}
              placeholder="전 객실 금연"
            />
            {errors.basic && <span>{errors.basic.message}</span>}
          </CeoBoxStyle>

          {/* 숙소 유의사항 */}
          <CeoBoxStyle>
            <label htmlFor="notice">숙소 유의사항</label>
            <textarea
              id="notice"
              {...register("notice")}
              placeholder="화기 사용 금지"
            />
            {errors.notice && <span>{errors.notice.message}</span>}
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

          {/* 1인 추가 요금 */}
          <CeoBoxStyle>
            <label htmlFor="extraCharge">1인 추가 요금</label>
            <div className="cost-group">
              <input
                className="cost-input"
                type="text"
                id="extraCharge"
                autoComplete="off"
                {...register("extraCharge")}
                onChange={e => handleOnlyNumber(e, "extraCharge")}
                placeholder="10000"
              />
              <p>원</p>
            </div>
            {errors.extraCharge && <span>{errors.extraCharge.message}</span>}
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
