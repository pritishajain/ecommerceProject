import { render, screen } from "@testing-library/react";
import LatestCollection from "../../pages/user/home_page/latest_collection";

describe("LatestCollection", () => {

  beforeEach(() => {
    render(
      <LatestCollection />  
    );
  });

  test("renders heading in document", () => {
    const headingElement = screen.getByTestId("heading");

    expect(headingElement).toBeInTheDocument();
  });

  test("renders image-1 in document", () => {
    const imageElement = screen.getByAltText("latestCollection-1");

    expect(imageElement).toBeInTheDocument();
  });

  
    test("renders image-2 in document", () => {
      const imageElement = screen.getByAltText("latestCollection-2");

      expect(imageElement).toBeInTheDocument();
    });

});


 




