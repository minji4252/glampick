import styled from "@emotion/styled";
import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
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
          background-color: ${colorSystem.p500};
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

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages?: number;
}

const ReviewPagination: React.FC<PaginationProps> = () => {
  // 초기 세팅 페이지
  const [activePage, setActivePage] = useState(1);
  // 한 페이지당 목록 수
  const itemsCountPerPage = 5;
  // 총 게시물 목록 수
  const totalItemsCount = 300;

  const handlePageChange = (pageNumber: number) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    // 여기서 데이터를 가져오거나, 다시 렌더링을 처리할 수 있음
  };

  return (
    <PaginationContainer>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        prevPageText={
          <span className="page-link-prev">
            <MdNavigateBefore className="icon" />
          </span>
        }
        nextPageText={
          <span className="page-link-next">
            <MdNavigateNext className="icon" />
          </span>
        }
      />
    </PaginationContainer>
  );
};

export default ReviewPagination;
