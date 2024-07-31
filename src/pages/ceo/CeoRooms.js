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

  .add-cost-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .add-cost-input {
    max-width: 120px;
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

const PeopleNumberStyle = styled.div`
  display: flex;
  align-items: center;
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

const CeoRooms = () => {
  const [images, setImages] = useState([]);

  // 폼의 초기값
  const initState = {
    RoomName: "",
    images: [],
    glampIntro: "",
    glampPhone: "",
    addCost: "",
  };

  // yup schema 셋팅
  const schema = yup.object().shape({
    RoomName: yup.string().required("글램핑장 이름을 입력해 주세요"),
    images: yup.array().min(1, "글램핑장 대표사진을 등록해 주세요"),
    glampPhone: yup.string().required("글램핑장 연락처를 입력해 주세요"),
    addCost: yup
      .string()
      .required("1인 추가 요금을 입력해 주세요")
      .min(4, "최소 금액은 1000원입니다")
      .max(6, "최대 금액을 초과하였습니다"),
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

  //  숫자만 입력 가능
  const handleChangeOnlyNumber = e => {
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
        .querySelector(".room-img-box")
        ?.scrollIntoView({ block: "center" });
    }
  }, [errors.images]);

  // -----------------------------------------------------------------------------

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

          {/* 객실 기준 인원 */}
          <CeoBoxStyle>
            <label htmlFor="peopleNum">객실 기준 인원</label>
            <PeopleNumberStyle>
              <div className="add-cost-group">
                <input
                  className="add-cost-input"
                  type="text"
                  id="addCost"
                  autoComplete="off"
                  {...register("addCost")}
                  onChange={handleChangeOnlyNumber}
                />
                <p>인</p>
              </div>
              <p>~</p>
              <div className="add-cost-group">
                <input
                  className="add-cost-input"
                  type="text"
                  id="addCost"
                  autoComplete="off"
                  {...register("addCost")}
                  onChange={handleChangeOnlyNumber}
                />
                <p>인</p>
              </div>
            </PeopleNumberStyle>
            {errors.addCost && <span>{errors.addCost.message}</span>}
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
