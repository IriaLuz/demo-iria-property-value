import "@testing-library/jest-dom";
import { queryByText, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Detail from "../../../modules/property-details";
import { theme } from "../../../theme/index";

export function renderWithTheme(children, customTheme) {
  return render(<ThemeProvider theme={customTheme}>{children}</ThemeProvider>);
}

const mockData = {
  uid: "65156cdc-5cfd-4b34-b626-49c83569f35e",
  deleted: false,
  dateCreated: "2020-12-03T08:55:33.421Z",
  currency: "GBP",
  name: "15 Temple Way",
  bankName: "Residential",
  type: "properties",
  subType: "residential",
  originalPurchasePrice: 250000,
  originalPurchasePriceDate: "2017-09-03",
  recentValuation: {
    amount: 310000,
    status: "good",
  },
  associatedMortgages: [
    {
      name: "HSBC Repayment Mortgage",
      uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
      currentBalance: -175000,
    },
  ],
  canBeManaged: false,
  postcode: "BS1 2AA",
  lastUpdate: "2020-12-03T08:55:33.421Z",
  updateAfterDays: 30,
};

describe("property-details component", () => {
  it("should render properly", () => {
    renderWithTheme(<Detail account={mockData} />, theme);
  });

  test("displays the correct estimated value of annual-apreciation", () => {
    render(
      <ThemeProvider theme={theme}>
        <Detail account={mockData} />
      </ThemeProvider>
    );

    const estimatedValue = screen.queryByTestId("annual-apreciation");

    expect(estimatedValue).toHaveTextContent("4%");
  });
});
