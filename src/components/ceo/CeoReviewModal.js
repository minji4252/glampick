import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { colorSystem } from "../../styles/color";
import { MainButton } from "../common/Button";
import { ModalWrapper } from "../common/PasswordCheckModal";
import axios from "axios";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import AlertModal from "../common/AlertModal";

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
  .review-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

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
  }
`;

const CeoReviewModal = ({
  isOpen,
  onClose,
  reviewId,
  glampId,
  setCanWriteReview,
  onApproval,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  useEffect(() => {
    const fetchCeoAccessToken = async () => {
      try {
        const token = localStorage.getItem("ceoAccessToken");
        if (token) {
          setCeoAccessToken(token);
          console.log("토큰 이씀");
        }
      } catch (error) {
        console.error("토큰 에러요: ", error);
      }
    };

    fetchCeoAccessToken();
  }, [setCeoAccessToken]);

  // 후기 내용
  const handleReviewTextChange = e => {
    setReviewText(e.target.value);
  };

  // 답변 글자 수 제한
  const maxReviewLength = 500;

  // 답변 작성하기
  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      glampId,
      reviewId,
      reviewOwnerContent: reviewText,
    };

    try {
      const response = await axios.patch(
        `${process.env.PUBLIC_URL}/api/owner/review`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        },
      );
      console.log("성공: ", response.data);
      setCanWriteReview(true);
      setAlertModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlertClose = () => {
    setAlertModalOpen(false);
    onApproval();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <ModalWrapper>
        <ReviewModalStyle>
          <ReviewModalContent>
            <button className="close-btn" onClick={onClose}>
              <IoClose />
            </button>
            <h2>답변 작성하기</h2>
            <form className="review-form" onSubmit={handleSubmit}>
              <textarea
                value={reviewText}
                onChange={handleReviewTextChange}
                placeholder="숙소 답변 작성"
                maxLength={maxReviewLength}
              />
              <div className="char-count">
                {reviewText.length}/{maxReviewLength}
              </div>

              <MainButton label="등록하기" type="submit" />
            </form>
          </ReviewModalContent>
        </ReviewModalStyle>
      </ModalWrapper>
      <AlertModal
        isOpen={alertModalOpen}
        onClose={handleAlertClose}
        message="리뷰 답변이 등록되었습니다."
      />
    </div>
  );
};

export default CeoReviewModal;
