import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Pagination from "react-js-pagination";
import { colorSystem } from "../../styles/color";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 20px 0;
    justify-content: center;
    align-items: center;

    .active {
      /* text-decoration: none; */
      padding: 8px 0;
      border-radius: 20px;
      /* display: flex; */
      justify-content: center;
      background-color: ${colorSystem.p400};
      color: white;
    }
    .page-item {
      margin: 0 5px;

      /* 텍스트 */
      .page-link {
        text-decoration: none;
        color: #333;
        padding: 8px 12px;
        border-radius: 20px;

        &:hover {
          background-color: ${colorSystem.p400};
          color: white;
        }

        &.active {
          background-color: ${colorSystem.p400};
          color: white;
        }
      }
      /* 이전, 다음 페이지 */
      .page-link-prev,
      .page-link-next {
      }
    }
  }
`;

const ListPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = pageNumber => {
    onPageChange(pageNumber);
    console.log(`선택된 페이지 ${pageNumber}`);
  };
  console.log(`페이지네이션 총 페이지 ${totalPages}`);

  // 페이지 이동할 때 젤 위로 가게 하기
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <PaginationContainer>
      <Pagination
        // 현재 페이지
        activePage={currentPage}
        // 한 페이지당 보여줄 아이템 갯수
        itemsCountPerPage={itemsPerPage}
        // 총 아이템 갯수
        totalItemsCount={totalItems}
        // paginator의 페이지 범위
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="active"
        // 이전 페이지를 나타낼 아이콘
        prevPageText={
          <span className="page-link-prev">
            <MdKeyboardArrowLeft className="icon" />
          </span>
        }
        // 다음을 나타낼 아이콘
        nextPageText={
          <span className="page-link-next">
            <MdKeyboardArrowRight className="icon" />
          </span>
        }
        // 첫번째 페이지를 나타낼 아이콘
        firstPageText={
          <span className="page-link-first">
            <MdKeyboardDoubleArrowLeft className="icon" />
          </span>
        }
        // 마지막 페이지를 나타낼 아이콘
        lastPageText={
          <span className="page-link-last">
            <MdKeyboardDoubleArrowRight className="icon" />
          </span>
        }
      />
    </PaginationContainer>
  );
};

export default ListPagination;
