import { colorSystem } from "../styles/color";
import styled from "@emotion/styled";
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { DeleteButton } from "./common/Button";
import useModal from "../hooks/UseModal";
import CheckModal from "./common/CheckModal";
import AlertModal from "./common/AlertModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyReviewCard = styled.div`
  display: flex;
  margin-bottom: 40px;

  .myreview-card-right {
    max-width: 800px;
    width: 100%;
  }

  .myreview-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;

    div {
      border-radius: 100%;
      width: 65px;
      height: 65px;
    }

    span {
      margin-top: 10px;
      font-weight: 600;
    }
  }
`;
const UserSection = styled.div`
  .myreview-title {
    max-width: 570px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      gap: 10px;
    }

    span {
      letter-spacing: 1.5px;
    }

    button {
      height: 25px;
      display: none;
    }
  }
  .myreview-score {
    display: flex;
    gap: 3px;
    color: ${colorSystem.star};
  }

  .myreview-content {
    font-size: 1rem;

    .myreview-glamp-name {
      cursor: pointer;
      padding: 5px;
      width: fit-content;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        color: ${colorSystem.p300};
      }
    }

    span {
      font-weight: 600;
    }

    p,
    textarea {
      margin-top: 15px;
      max-width: 570px;
      line-height: 1.5rem;
      font-size: 0.9rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    button {
      margin-top: 15px;
      height: 35px;
      font-size: 0.9rem;
    }
  }
`;

const MyReviewImage = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  > div {
    max-width: 180px;
    width: 100%;
    height: 200px;
    border-radius: 25px;
    background-size: cover;
  }
  .myreview-img1 {
    background: url(${reviewimg1}) no-repeat center;
  }
  .myreview-img2 {
    background: url(${reviewimg2}) no-repeat center;
  }
  .myreview-img3 {
    background: url(${reviewimg3}) no-repeat center;
  }

  @media all and (min-width: 768px) and (max-width: 850px) {
    .myreview-img2,
    .myreview-img3 {
      display: none;
    }

    .myreview-img1 {
      width: 100%;
      max-width: 370px;
      background-size: cover;
    }
  }

  @media all and (max-width: 540px) {
    .myreview-img2,
    .myreview-img3 {
      display: none;
    }

    .myreview-img1 {
      width: 100%;
      max-width: 370px;
      background-size: cover;
    }
  }
`;

const OwnerSection = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: ${colorSystem.beige};
  padding: 25px;
  border-radius: 20px;

  .owner-title {
    display: flex;
    justify-content: space-between;
  }

  h4 {
    font-weight: 700;
    color: ${colorSystem.g800};
    font-size: 0.9rem;
  }

  .owner-content {
    margin-top: 15px;
    padding-left: 20px;
    line-height: 1.4rem;
    font-weight: 500;
    color: ${colorSystem.g900};

    > p {
      width: 70%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;

const UnderLine = styled.div`
  width: 95%;
  height: 1px;
  border-bottom: 1px solid ${colorSystem.g200};
  margin-bottom: 40px;
`;

const ReviewCard = ({
  reviewId,
  userNickName,
  glampName,
  glampId,
  roomName,
  createdAt,
  userReviewContent,
  ownerReviewContent,
  starPoint,
  reviewImages,
  userProfileImage,
}) => {
  const { isModalOpen, modalMessage, CheckAction, openModal, closeModal } =
    useModal();
  const [accessToken, setAccessToken] = useState("");

  const {
    isModalOpen: isAlertOpen,
    modalMessage: alertMessage,
    openModal: openAlert,
    closeModal: closeAlert,
  } = useModal();

  //2024-00-00 형식으로 변경
  const date = new Date(createdAt);
  const formattedDate = date.toISOString().split("T")[0];

  const renderStars = starPoint => {
    const stars = [];
    const totalStars = 5;

    for (let i = 0; i < starPoint; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }

    for (let i = starPoint; i < totalStars; i++) {
      stars.push(<FaRegStar key={`star-${i}`} />);
    }

    return stars;
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);
        } else {
          console.log("쿠키에 access-Token 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleDelete = async () => {
    if (!accessToken) return;
    axios.defaults.withCredentials = true;

    openModal({
      message: "정말 삭제하시겠습니까?",
      onCheck: async () => {
        try {
          const response = await axios.delete(
            `/api/user/delete?reviewId=${reviewId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          console.log(response);
          closeModal();
          window.location.reload();
          // openAlert("삭제가 완료되었습니다.");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          closeModal();
          openAlert("삭제 중 오류가 발생했습니다.");
        }
      },
    });
  };

  return (
    <>
      <MyReviewCard>
        <div className="myreview-card-left">
          <div
            className="user-profile-img"
            style={{
              backgroundImage: `url(${userProfileImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <span>{userNickName}</span>
        </div>
        <div className="myreview-card-right">
          <UserSection>
            <div className="myreview-title">
              <div>
                <div className="myreview-score">{renderStars(starPoint)}</div>
                <span>{formattedDate}</span>
              </div>
              <DeleteButton label="삭제" onClick={handleDelete} />
            </div>
            <MyReviewImage
              style={{
                marginTop: reviewImages.length > 0 ? "20px" : "10px",
              }}
            >
              {reviewImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </MyReviewImage>
            <div
              className="myreview-content"
              style={{
                marginTop: reviewImages.length > 0 ? "30px" : "0px",
              }}
            >
              <Link to={`/places/${glampId}`}>
                <div className="myreview-glamp-name">
                  <span>{glampName}</span>
                  <span>|</span>
                  <span>{roomName}</span>
                </div>
              </Link>
              <p>{userReviewContent}</p>
            </div>
          </UserSection>
          {ownerReviewContent?.length > 0 && (
            <OwnerSection>
              <div className="owner-title">
                <h4>숙소 답변</h4>
              </div>
              <div className="owner-content">
                <p>{ownerReviewContent}</p>
              </div>
            </OwnerSection>
          )}
        </div>

        <CheckModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={CheckAction}
          message={modalMessage}
        />
        <AlertModal
          isOpen={isAlertOpen}
          onClose={closeAlert}
          message={alertMessage}
        />
      </MyReviewCard>
      <UnderLine />
    </>
  );
};

export default ReviewCard;

// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
function getCookie(name) {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]*)`);
  return cookieValue ? cookieValue.pop() : "";
}
