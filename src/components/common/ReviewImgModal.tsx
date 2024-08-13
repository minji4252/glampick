import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { colorSystem } from "../../styles/color";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export const ModalOverlay = styled.div`
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
  max-height: 80%;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  overflow: hidden; /* 스크롤이 내부에서만 발생하도록 설정 */
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
  margin-bottom: 20px;
  max-height: 60vh; /* 스크롤이 생길 수 있는 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤 허용 */
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

// Props 타입 정의
interface ReviewImgModalProps {
  isOpen: boolean;
  onClose: () => void;
  glampId: string;
}

const ReviewImgModal: React.FC<ReviewImgModalProps> = ({
  isOpen,
  onClose,
  glampId,
}) => {
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // 더보기 버튼
  const [hasMore, setHasMore] = useState(true);

  // 리뷰 이미지 더보기 모달에서 불러올 사진
  useEffect(() => {
    const getGlamping = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.PUBLIC_URL}/api/glamping?glampId=${glampId}&page=${currentPage}`,
        );
        // console.log("리뷰전체사진", response.data);
        const { moreReviewImage } = response.data;
        setReviewImages(prevImages => [...prevImages, ...moreReviewImage]);

        // 더 이상 불러올 사진이 없는 경우 hasMore를 false로 설정
        if (moreReviewImage.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getGlamping();
  }, [currentPage, glampId, isOpen]);

  // 모달창 나타날 떄 스크롤 금지
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

  // 배경 클릭 시 모달 닫기 핸들러
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
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
          {loading && <Loading />}
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
        {hasMore && !loading && (
          <MoreButton onClick={handleMoreClick}>더보기</MoreButton>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

// TypeScript에서는 PropTypes를 사용하지 않음
// ReviewImgModal.propTypes = {
//   reviewImages: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onClose: PropTypes.func.isRequired,
//   onMoreClick: PropTypes.func,
// };

export default ReviewImgModal;
