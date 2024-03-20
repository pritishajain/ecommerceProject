import { render, screen } from "@testing-library/react";
import Footer from "../../components/footer_section/footer";
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
