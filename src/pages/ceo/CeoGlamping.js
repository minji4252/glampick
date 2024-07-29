import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { useState } from "react";
import { CeoButton } from "../../components/common/Button";
import { FaCamera } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { useDaumPostcodePopup } from "react-daum-postcode";

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
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 30px;

  > div {
    display: flex;
    gap: 15px;
    height: 200px;
    margin-top: 20px;
  }

  label {
    font-weight: 600;
    color: ${colorSystem.g800};
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

  p {
    color: ${colorSystem.placeholder};
  }
`;

const ImageUploadStyle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  input {
    display: none;
  }

  .upload-label {
    position: relative;
    /* display: inline-block; */
    padding: 10px 20px;
    width: 90px;
    height: 90px;
    border: 1px solid ${colorSystem.g200};
    border-radius: 20px;
    background-color: ${colorSystem.white};
    color: ${colorSystem.g200};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      .camera-img {
        color: ${colorSystem.p700};
      }
    }
  }

  .image-upload-info {
    display: flex;
    justify-content: center;
  }

  .uploaded-images {
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
  }
  .delete-image {
    border: none;
    background: none;
    cursor: pointer;
    color: ${colorSystem.p400};
    font-size: 0.9rem;

    svg {
      margin-left: 10px;
      width: 20px;
      height: 20px;
    }
  }
`;

const CeoGlamping = () => {
  const [glampName, setGlampName] = useState("");
  // const [glampImg, setGlampImg] = useState("");
  const [images, setImages] = useState([]);
  const [glampIntro, setGlampIntro] = useState("");
  const [infoBasic, setInfoBasic] = useState("");
  const [infoNotice, setInfoNotice] = useState("");
  const [glampAddress, setGlampAddress] = useState("");
  const [glampElseAddress, setGlampElseAddress] = useState("");
  const [traffic, setTraffic] = useState("");

  // 추가된 이미지 개수와 전체 등록 가능한 이미지 개수 상태 추가
  const maxImageCount = 1;
  const [uploadedImageCount, setUploadedImageCount] = useState(images.length);

  // 이미지 업로드
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    // 이미지가 현재 배열에 있는 이미지 개수를 더해 3장 이하로 제한
    if (images.length + files.length > maxImageCount) {
      alert(`이미지는 최대 ${maxImageCount}장까지 등록 가능합니다.`);
      return;
    }
    setImages([...images, ...files.slice(0, maxImageCount - images.length)]);
    setUploadedImageCount(images.length + files.length);
  };

  // 이미지 삭제
  const handleImageDelete = index => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setUploadedImageCount(updatedImages.length);
  };

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

    setGlampAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  // axios post
  const handleSubmit = async e => {
    e.preventDefault();
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>글램핑장 등록</h3>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          {/* 글램핑장 이름 */}
          <CeoBoxStyle>
            <label htmlFor="glampname">글램핑장 이름</label>
            <input
              type="text"
              id="glampname"
              value={glampName}
              onChange={e => {
                setGlampName(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 글램핑장 사진 */}
          <CeoBoxStyle className="glamp-img-box">
            <label>글램핑장 사진</label>
            <p>대표사진 1장을 등록해주세요</p>
            <ImageUploadStyle>
              <label htmlFor="imageUpload" className="upload-label">
                <FaCamera className="camera-img" />
                <div className="image-upload-info">
                  <span>
                    {uploadedImageCount}/{maxImageCount}
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                onChange={e => {
                  handleImageUpload(e);
                }}
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
          </CeoBoxStyle>
          {/* 숙소 소개 */}
          <CeoBoxStyle>
            <label htmlFor="glampIntro">숙소 소개</label>
            <textarea
              id="glampIntro"
              value={glampIntro}
              onChange={e => {
                setGlampIntro(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 숙소 기본정보 */}
          <CeoBoxStyle>
            <label htmlFor="infoBasic">숙소 기본정보</label>
            <textarea
              id="infoBasic"
              value={infoBasic}
              onChange={e => {
                setInfoBasic(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 숙소 유의사항 */}
          <CeoBoxStyle>
            <label htmlFor="infoNotice">숙소 유의사항</label>
            <textarea
              id="infoNotice"
              value={infoNotice}
              onChange={e => {
                setInfoNotice(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 글램핑장 주소 */}
          <CeoBoxStyle>
            <label htmlFor="glampAddress">글램핑장 주소</label>
            <div>
              <input
                type="text"
                id="glampAddress"
                value={glampAddress}
                onChange={e => {
                  setGlampAddress(e.target.value);
                }}
              />
              <CeoButton label="주소검색" onClick={handleClick} />
            </div>
            <input
              type="text"
              value={glampElseAddress}
              onChange={e => {
                setGlampElseAddress(e.target.value);
              }}
              placeholder="상세주소를 입력하세요"
            />
          </CeoBoxStyle>
          {/* 주변 관광지 */}
          <CeoBoxStyle>
            <label htmlFor="traffic">주변 관광지</label>
            <textarea
              id="traffic"
              value={traffic}
              onChange={e => {
                setTraffic(e.target.value);
              }}
            />
          </CeoBoxStyle>
          <div className="submit-btn">
            <CeoButton label="등록하기" />
          </div>
        </form>
      </div>
    </WrapStyle>
  );
};

export default CeoGlamping;
