import styled from "@emotion/styled";
import { colorSystem } from "../styles/color";

export const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  margin-bottom: 50px;
`;

export const TitleStyle = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    left: 0;
    font-size: 1.2rem;
    color: ${colorSystem.g900};
    cursor: pointer;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g800};
  }
`;

export const ListStyle = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;

  ul {
    display: flex;
    width: 100%;
    gap: 6px 8px;
    margin-bottom: 20px;
    justify-content: flex-start;

    overflow-x: hidden;

    overscroll-behavior: none;
    flex-wrap: nowrap;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  li {
    border: 1px solid ${colorSystem.g200};
    font-weight: 600;
    color: ${colorSystem.g900};
    font-size: 0.9rem;
    list-style: none;
    padding: 8px 20px;
    border-radius: 100px;
    cursor: pointer;
    flex: 0 0 auto;
    max-width: 210px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .focused {
    background-color: ${colorSystem.primary};
    color: ${colorSystem.white};
  }
`;

export const ListButton = styled.div`
  max-height: 32px;
  min-height: 32px;
  min-width: 32px;
  max-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  background-color: ${colorSystem.white};
  border-radius: 999px;
  border-width: 2px;
  border: 1px solid ${colorSystem.g200};

  &::before {
    width: 20px;
    min-height: 32px;
    content: "";
    position: absolute;
    left: -21px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0.43%,
      rgb(255, 255, 255) 100%
    );
  }

  svg {
    font-size: 1.2rem;
    color: ${colorSystem.p500};
    padding-top: 2px;
  }

  .moreview {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }

  .moreclick {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }
`;

export const LargeSwiper = styled.div`
  width: 100%;
  max-height: 550px;
  height: 100%;

  .swiper {
    max-height: 550px;
    width: 100%;
    height: 100%;
  }

  .swiper-slide div {
    width: 70%;
  }

  .swiper-slide-prev {
    width: 100%;
    height: 100%;
    background-color: ${colorSystem.background};
  }
  .swiper-slide-active {
    width: 100%;
    height: 100%;
    background-color: ${colorSystem.background};
  }

  .swiper-slide-next {
    width: 100%;
    height: 100%;
    background-color: ${colorSystem.background};
  }

  .swiper-wrapper {
    position: relative;
    overflow: visible;
  }

  .swiper-button-prev {
    position: absolute;
    left: 6%;
  }

  .swiper-button-next {
    position: absolute;
    right: 6%;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    color: ${colorSystem.p300};
    font-size: 30px;
    font-weight: 800;
  }
`;

export const SmallSwiper = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 20px;
  .swiper {
    width: 100%;
    height: 100%;
    max-width: 320px;
  }

  .swiper-wrapper {
    display: flex;
    align-items: center;
  }

  .swiper-slide div {
    max-width: 85px;
  }

  .swiper-slide-prev div {
    border-radius: 12px;
    width: 60px;
    height: 60px;
  }

  .swiper-slide-active div {
    border-radius: 12px;
    width: 85px;
    height: 85px;
    border: 4px solid ${colorSystem.p500};
    min-width: 85px;
  }

  .swiper-slide-next div {
    border-radius: 12px;
    width: 60px;
    height: 60px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    color: ${colorSystem.p300};
    font-size: 20px;
    font-weight: 800;
    display: none;
  }

  .swiper-button-prev {
    width: 60px;
    height: 60px;
    left: 0;
    top: 82px;
    border-radius: 12px;
  }

  .swiper-button-next {
    width: 60px;
    height: 60px;
    right: 0;
    top: 82px;
    border-radius: 12px;
  }

  .swiper-pagination {
    color: ${colorSystem.primary};
    font-weight: 600;
  }
`;
