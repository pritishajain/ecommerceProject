import { render, screen } from "@testing-library/react";
import Footer from "../../components/home_page/footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
  test("present in document", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footerElement = screen.getByTestId("footerContainer");
    expect(footerElement).toBeInTheDocument();
  });
});
