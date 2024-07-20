import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { colorSystem } from "../../styles/color";
import axios from "axios";
import { useEffect, useState } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 60%;
  max-width: 600px;
  max-height: 60%;
  padding: 20px;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colorSystem.g400};
`;

const ModalTitle = styled.h2`
  font-size: 1rem;
  color: ${colorSystem.g900};
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ImageItem = styled.div`
  flex: 0 0 calc(20% - 10px); /* 한 줄에 5개 */
  padding-top: 100%; /* 비율을 유지하면서 고정 높이 설정 */
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const MoreButton = styled.button`
  display: block;
  border: none;
  background: none;
  cursor: pointer;
  color: ${colorSystem.p800};
  font-size: 0.9rem;
  padding: 5px;
  &:hover {
    font-weight: 600;
  }
`;

const ReviewImgModal = ({ isOpen, onClose, glampId }) => {
  const [reviewImages, setReviewImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 리뷰 이미지 더보기 모달에서 불러올 사진
  useEffect(() => {
    const getGlamping = async () => {
      try {
        const response = await axios.get(
          `${process.env.PUBLIC_URL}/api/glamping?glampId=${glampId}&page=${currentPage}`,
        );
        // console.log("리뷰전체사진", response.data);
        const allReviewImage = response.data.moreReviewImage;
        setReviewImages(prevImages => [...prevImages, ...allReviewImage]);
      } catch (error) {
        // console.log(error);
      }
    };
    getGlamping();
  }, [currentPage, glampId]);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleBodyScroll();

    return () => {
      // 모달이 닫힐 때 body의 overflow 스타일을 원래대로 되돌림
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 리뷰사진 더보기 버튼
  const handleMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1); // 모달창 페이지 증가
  };

  // 빈 요소를 추가하여 총 5의 배수가 되도록 함
  const filledImages = [
    ...reviewImages,
    ...Array.from({ length: (5 - (reviewImages.length % 5)) % 5 }),
    //배열의 길이를 5로 나눈 나머지
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>사진 전체보기</ModalTitle>
          <CloseButton
            onClick={() => {
              onClose();
            }}
          >
            <IoClose />
          </CloseButton>
        </ModalHeader>
        <ImageContainer>
          {filledImages.map((img, index) => (
            <ImageItem
              key={index}
              style={{
                backgroundImage: img ? `url(${img})` : "none",
                backgroundColor: img ? "transparent" : "none",
              }}
            />
          ))}
        </ImageContainer>
        <MoreButton onClick={handleMoreClick}>더보기</MoreButton>
      </ModalContent>
    </ModalOverlay>
  );
};

ReviewImgModal.propTypes = {
  reviewImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func,
};

export default ReviewImgModal;
