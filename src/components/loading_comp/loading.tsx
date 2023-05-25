import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150vh;
`;

const Loading = () => {
  return (
    <React.Fragment>
      <LoaderContainer>
        <ReactLoading type="bubbles" color="black" height={600} width={300} />
      </LoaderContainer>
    </React.Fragment>
  );
};

export default Loading;
