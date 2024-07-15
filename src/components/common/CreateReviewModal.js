import React, { useState } from 'react'
import { MainButton } from './Button';
import { IoClose } from 'react-icons/io5';
import { colorSystem } from '../../styles/color';
import styled from '@emotion/styled';

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

  .review-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .rating {
      display: flex;
      justify-content: center;
      gap: 5px;
      font-size: 24px;
      color: ${colorSystem.p700};
      cursor: pointer;
    }

    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      border: 1px solid ${colorSystem.g200};
      border-radius: 10px;
      resize: none;
      outline: none;
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
        border: 1px solid ${colorSystem.p700};
        border-radius: 10px;
        background-color: ${colorSystem.white};
        color: ${colorSystem.p700};
        cursor: pointer;
        &:hover {
          background-color: ${colorSystem.p700};
          color: ${colorSystem.white};
        }
      }

      .uploaded-images {
        display: flex;
        gap: 10px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
        }
      }
    }
  }
`;

const CreateReviewModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [images, setImages] = useState([]);
  
    const handleRating = (rate) => {
        setRating(rate);
      };
    
      const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
      };
    
      const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
      };
    
      const handleSubmit = () => {
        // submit logic here
        console.log({ rating, reviewText, images });
        onClose();
      };
    
      if (!isOpen) return null;
    
  return  (
    <ReviewModalStyle>
      <button className="close-btn" onClick={onClose}>
        <IoClose />
      </button>
      <form className="review-form">
        <div className="rating">
          {[1, 2, 3, 4, 5].map((rate) => (
            <span key={rate} onClick={() => handleRating(rate)}>
              {rate <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <textarea
          value={reviewText}
          onChange={handleReviewTextChange}
          placeholder="후기를 작성해주세요"
        />
        <div className="image-upload">
          <label htmlFor="imageUpload" className="upload-label">
            이미지 업로드
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <div className="uploaded-images">
            {images.map((image, index) => (
              <img key={index} src={URL.createObjectURL(image)} alt="uploaded" />
            ))}
          </div>
        </div>
        <MainButton label="제출" onClick={handleSubmit} />
      </form>
    </ReviewModalStyle>
  );
};


export default CreateReviewModal