import React from "react";
import styled from "styled-components";

interface IpaginateProps {
    currentPage:number,
    productsPerPage:number,
    totalProducts:number,
    paginate:(pageNumber: number) => void
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 10px;
  margin: 0;
`;

const PaginationLink = styled.button`
  font-size: 20px;
`;

const PaginationItem = styled.li<{active:boolean}>`
  margin: 0 5px;

  & button {
    background-color: ${(props) => (props.active ? "#cf5a5a" : "#fff")};
    border: 2px solid #c09fb8;
    color: ${(props) => (props.active ? "#fff" : "#4d4f52")};
    cursor: pointer;
    padding: 8px 14px;
    font-weight: 700;
    box-shadow: 0px 8px 16px 0px rgba(221, 218, 218, 0.466);
  }

  & button:hover {
    background-color: ${(props) => (props.active ? "#aaa3a3" : "#ddd")};
  }
`;

const Pagination = (props:IpaginateProps) => {

  const pageNumbers = [];
  const totalPages = Math.ceil(props.totalProducts / props.productsPerPage);

  const minPageNumber = Math.max(1, props.currentPage - 2);
  const maxPageNumber = Math.min(totalPages, props.currentPage + 2);

  for (let i = minPageNumber; i <= maxPageNumber; i++) {
    pageNumbers.push(i);
  }

  
  return (
    <React.Fragment>
       <PaginationWrapper>
      <PaginationList>
        {pageNumbers.map((number) => (
          <PaginationItem key={number} active={number === props.currentPage}>
            <PaginationLink onClick={() => props.paginate(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationList>
    </PaginationWrapper>
    </React.Fragment>
  );
};

export default Pagination;