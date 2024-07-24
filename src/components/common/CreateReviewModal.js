import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCamera, FaRegStar, FaStar } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { colorSystem } from "../../styles/color";
import { getCookie } from "../../utils/cookie";
import { MainButton } from "./Button";
import { ModalWrapper } from "./PasswordCheckModal";

const ReviewModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colorSystem.white};
  z-index: 99999;
  max-width: 500px;
  width: 100%;
  max-height: 600px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 20px;
`;
const ReviewModalContent = styled.div`
  > h2 {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .close-btn {
    background-color: transparent;
    border: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
      color: ${colorSystem.g800};
    }
  }

  // 숙소 정보
  .glamping-info {
    display: flex;
    margin-bottom: 5px;
  }
  .room-info {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${colorSystem.g700};
    margin-right: 7px;
  }
  .room-info-content {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${colorSystem.g900};
  }

  // 이용 정보
  .use-info {
    display: flex;
  }
  .user-info {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${colorSystem.g700};
    margin-right: 7px;
  }
  .user-info-content {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${colorSystem.g900};
  }

  .review-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .rating {
      display: flex;
      justify-content: center;
      gap: 5px;
      font-size: 1.5rem;
      color: ${colorSystem.star};
      cursor: pointer;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    textarea {
      width: 100%;
      height: 130px;
      padding: 10px;
      border: none;
      background-color: ${colorSystem.background};
      border-radius: 10px;
      resize: none;
      outline: none;
    }
    .char-count {
      text-align: right;
      color: ${colorSystem.g600};
      font-size: 0.9rem;
    }

    .image-upload {
      display: flex;
      gap: 10px;
      align-items: center;
      input {
        display: none;
      }

      .upload-label {
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        width: 90px;
        height: 90px;
        border: 1px solid ${colorSystem.g200};
        border-radius: 20px;
        background-color: ${colorSystem.white};
        color: ${colorSystem.g200};
        cursor: pointer;
      }

      .uploaded-images {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 90px;
          height: 90px;
          border-radius: 20px;
          object-fit: cover;
        }
      }
      .camera-img {
        width: 80%;
        height: 80%;
        &:hover {
          color: ${colorSystem.p700};
        }
      }
      .delete-image {
        border: none;
        background: none;
        cursor: pointer;
        color: ${colorSystem.p400};
        font-size: 0.9rem;
      }
    }
  }
`;

const CreateReviewModal = ({
  isOpen,
  onClose,
  reservationId,
  reviewStarPoint,
  glampName,
  roomName,
  checkInDate,
  checkOutDate,
  setCanWriteReview,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  // 추가된 이미지 개수와 전체 등록 가능한 이미지 개수 상태 추가
  const maxImageCount = 3;
  const [uploadedImageCount, setUploadedImageCount] = useState(images.length);
  const [loading, setLoading] = useState(false);

  // 모달창 오픈시 스크롤 금지 컨트롤
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      // 모달이 닫힐 때 body의 overflow 스타일을 원래대로 되돌림
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);
        } else {
          // console.log("쿠키에 access-Token 없음");
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchAccessToken();
  }, []);

  // 리뷰 작성 글자수 제한
  const maxReviewLength = 500;

  // 별점
  const handleRating = rate => {
    setRating(rate);
  };

  // 후기 내용
  const handleReviewTextChange = e => {
    setReviewText(e.target.value);
  };

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

  // 폼 제출
  const handleSubmit = async e => {
    // submit logic here
    e.preventDefault();
    if (!accessToken) return;

    // FormData 객체를 사용하여 multipart/form-data 요청 생성
    const formData = new FormData();

    // dto 필드를 JSON 문자열로 추가
    const dto = JSON.stringify({
      reservationId: reservationId,
      reviewContent: reviewText,
      reviewStarPoint: rating,
    });
    formData.append("dto", dto);

    // 이미지 파일 추가
    images.forEach(image => {
      formData.append("mf", image);
    });

    try {
      const response = await axios.post(`/api/user/review`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // 후기가 성공적으로 제출되었을 때 페이지 새로 고침
        //window.location.reload();
        console.log("새로고침됨");
        setCanWriteReview(1);
      }
      // console.log(response);
    } catch (error) {
      // console.log(error.response.data);
      setCanWriteReview(0);
    }
    // console.log({ rating, reviewText, images });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ReviewModalStyle>
        <ReviewModalContent>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
          <h2>후기 작성하기</h2>
          <div className="glamping-info">
            <div className="room-info">숙소정보</div>
            <div className="room-info-content">
              {glampName} ({roomName})
            </div>
          </div>
          <div className="use-info">
            <div className="user-info">이용정보</div>
            <div className="user-info-content">
              {checkInDate} ~ {checkOutDate}
            </div>
          </div>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="rating">
              {[1, 2, 3, 4, 5].map(rate => (
                <span key={rate} onClick={() => handleRating(rate)}>
                  {rate <= rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={e => {
                handleReviewTextChange(e);
              }}
              placeholder="숙소에 대한 솔직한 리뷰를 남겨주세요."
              maxLength={maxReviewLength}
            />
            <div className="char-count">
              {reviewText.length}/{maxReviewLength}
            </div>
            <div className="image-upload">
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
            </div>
            <MainButton label="등록하기" onClick={handleSubmit} />
          </form>
        </ReviewModalContent>
      </ReviewModalStyle>
    </ModalWrapper>
  );
};

export default CreateReviewModal;
