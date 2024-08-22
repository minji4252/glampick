import styled from "@emotion/styled";
import { useEffect } from "react";
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
      padding: 8px 0;
      border-radius: 20px;
      justify-content: center;
      background-color: ${colorSystem.p400};
      color: white;
    }
    .page-item {
      margin: 0 5px;
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
      .page-link-prev,
      .page-link-next {
      }
    }
  }
`;

interface ListPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages?: number;
}

const ListPagination: React.FC<ListPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  // 페이지 이동할 때 젤 위로 가게 하기
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <PaginationContainer>
      <Pagination
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
        prevPageText={
          <span className="page-link-prev">
            <MdKeyboardArrowLeft className="icon" />
          </span>
        }
        nextPageText={
          <span className="page-link-next">
            <MdKeyboardArrowRight className="icon" />
          </span>
        }
        firstPageText={
          <span className="page-link-first">
            <MdKeyboardDoubleArrowLeft className="icon" />
          </span>
        }
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
