import React, { useState } from "react";
import { MainButton } from "./Button";
import { IoClose } from "react-icons/io5";
import { FaStar, FaRegStar, FaCamera } from "react-icons/fa";
import { colorSystem } from "../../styles/color";
import styled from "@emotion/styled";

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

  .room-info {
    display: flex;
  }

  .use-info {
    display: flex;
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
      flex-direction: column;
      gap: 10px;
      input {
        display: none;
      }

      .upload-label {
        display: inline-block;

        padding: 10px 20px;
        width: 90px;
        height: 90px;
        border: 1px solid ${colorSystem.g200};
        border-radius: 20px;
        background-color: ${colorSystem.white};
        color: ${colorSystem.g200};
        cursor: pointer;
        &:hover {
          color: ${colorSystem.p700};
        }
      }

      .uploaded-images {
        gap: 10px;
        align-items: center;
        justify-content: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
        }
      }
      .camera-img {
        width: 80%;
        height: 80%;
      }
    }
  }
`;

const CreateReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  // 리뷰 작성 글자수 제한
  const maxReviewLength = 1000;

  const handleRating = rate => {
    setRating(rate);
  };

  const handleReviewTextChange = e => {
    setReviewText(e.target.value);
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = () => {
    // submit logic here
    console.log({ rating, reviewText, images });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ReviewModalStyle>
      <ReviewModalContent>
        <button className="close-btn" onClick={onClose}>
          <IoClose />
        </button>
        <h2>후기 작성하기</h2>
        <div className="room-info">
          <div>숙소정보</div>
          <div>별별 글램핑(A룸 202호) </div>
        </div>
        <div className="use-info">
          <div>이용정보</div>
          <div>이용정보</div>
        </div>

        <form className="review-form">
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
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="uploaded"
                />
              ))}
            </div>
          </div>
          <MainButton
            label="등록하기"
            onClick={() => {
              handleSubmit();
            }}
          />
        </form>
      </ReviewModalContent>
    </ReviewModalStyle>
  );
};

export default CreateReviewModal;
