import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { useState } from "react";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 160px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  form {
    max-width: 800px;
    width: 100%;
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

  label {
    font-weight: 600;
  }

  input,
  textarea {
    max-width: 640px;

    border: 0px;
    background-color: ${colorSystem.g100};
    height: 40px;
    border-radius: 10px;
    padding: 15px;
  }

  textarea {
    height: 140px;
  }

  p {
    color: ${colorSystem.placeholder};
  }
`;

const CeoGlamping = () => {
  const [glampName, setGlampName] = useState("");
  const [glampImg, setGlampImg] = useState("");
  const [glampIntro, setGlampIntro] = useState("");
  const [infoBasic, setInfoBasic] = useState("");
  const [infoNotice, setInfoNotice] = useState("");
  const [glampLocation, setGlampLocation] = useState("");
  const [traffic, setTraffic] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>글램핑장 관리</h3>
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
          <CeoBoxStyle>
            <label>글램핑장 사진</label>
            <p>대표사진 1장을 등록해주세요</p>
          </CeoBoxStyle>
          {/* 숙소 소개 */}
          <CeoBoxStyle>
            <label htmlFor="glampname">숙소 소개</label>
            <textarea
              id="glampname"
              value={glampName}
              onChange={e => {
                setGlampName(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 숙소 기본정보 */}
          <CeoBoxStyle>
            <label htmlFor="glampname">숙소 기본정보</label>
            <textarea
              id="glampname"
              value={glampName}
              onChange={e => {
                setGlampName(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 숙소 유의사항 */}
          <CeoBoxStyle>
            <label htmlFor="glampname">숙소 유의사항</label>
            <textarea
              id="glampname"
              value={glampName}
              onChange={e => {
                setGlampName(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 글램핑장 주소 */}
          <CeoBoxStyle>
            <label htmlFor="glampname">글램핑장 주소</label>
            <input
              type="text"
              id="glampname"
              value={glampName}
              onChange={e => {
                setGlampName(e.target.value);
              }}
            />
          </CeoBoxStyle>
          {/* 주변 관광지 */}
          <CeoBoxStyle>
            <label htmlFor="glampname">주변 관광지</label>
            <textarea
              id="glampname"
              value={glampName}
              onChange={e => {
                setGlampName(e.target.value);
              }}
            />
          </CeoBoxStyle>
        </form>
      </div>
    </WrapStyle>
  );
};

export default CeoGlamping;
