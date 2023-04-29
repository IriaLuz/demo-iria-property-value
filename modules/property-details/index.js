/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline,
  AccountLabel,
  AccountList,
  AccountListItem,
  AccountSection,
  InfoText,
  Inset,
  InfoValuationChange,
} from "./style";

const account = {
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
  recentValuation: { amount: 310000, status: "good" },
  associatedMortgages: [
    {
      name: "HSBC Repayment Mortgage",
      uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
      currentBalance: -175000,
    },
  ],
  canBeManaged: false,
  postcode: "BS1 2AA",
  lastUpdate: "2020-12-01T08:55:33.421Z",
  updateAfterDays: 30,
};

const PriceFormatter = (price) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const formattedPrice = formatter.format(Math.abs(price));

  return (
    <div>
      <p>{formattedPrice}</p>
    </div>
  );
};

const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const getYearsSincePurchase = (originalPurchasePriceDate) =>
  new Date().getFullYear() - new Date(originalPurchasePriceDate).getFullYear();

const getSincePurchase = (recentValuation, originalPurchasePrice) =>
  recentValuation.amount - originalPurchasePrice;

const getSincePurchasePercentage = (recentValuation, originalPurchasePrice) =>
  (getSincePurchase(recentValuation, originalPurchasePrice) /
    originalPurchasePrice) *
  100;

const {
  recentValuation,
  originalPurchasePrice,
  originalPurchasePriceDate,
  recentValuation: { amount },
  associatedMortgages: [{ currentBalance }],
} = account;

const yearsSincePurchase = getYearsSincePurchase(originalPurchasePriceDate);

const sincePurchasePercentage = getSincePurchasePercentage(
  recentValuation,
  originalPurchasePrice
);

const annualApreciatioPercentage = `${
  sincePurchasePercentage / yearsSincePurchase
}%`;

const purshacedDate = formatMonthYear(originalPurchasePriceDate);

const sincePurchaseValue = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumSignificantDigits: 3,
}).format(Math.abs(getSincePurchase(recentValuation, originalPurchasePrice)));

const sincePurchaseInfo = `${sincePurchaseValue} (${sincePurchasePercentage}%)`;

const originalPurchaseCost = PriceFormatter(originalPurchasePrice);
const recentValuationCost = PriceFormatter(amount);
const currentBalanceInMortage = PriceFormatter(currentBalance);

const Detail = () => {
  const mortgage = account.associatedMortgages.length
    ? account.associatedMortgages[0]
    : null;
  const lastUpdate = new Date(account.lastUpdate);

  return (
    <Inset>
      <AccountSection>
        <AccountLabel>Estimated Value</AccountLabel>
        <AccountHeadline>{recentValuationCost}</AccountHeadline>
        <AccountList>
          <AccountListItem>
            <InfoText>
              {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
            </InfoText>
          </AccountListItem>
          <AccountListItem>
            <InfoText>
              {`Next update ${format(
                add(lastUpdate, { days: account.updateAfterDays }),
                "do MMM yyyy"
              )}`}
            </InfoText>
          </AccountListItem>
        </AccountList>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Property details</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem>
              <InfoText>{account.name}</InfoText>
            </AccountListItem>
            <AccountListItem>
              <InfoText>{account.bankName}</InfoText>
            </AccountListItem>
            <AccountListItem>
              <InfoText>{account.postcode}</InfoText>
            </AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Valuation Change</AccountLabel>
        <AccountList>
          <AccountListItem>
            <InfoText>
              {" "}
              Purchased for
              {originalPurchaseCost}
              {`in ${purshacedDate}`}
            </InfoText>
          </AccountListItem>
          <AccountListItem>
            <InfoText>Since Purchased</InfoText>
            <InfoValuationChange>{sincePurchaseInfo}</InfoValuationChange>
          </AccountListItem>
          <AccountListItem>
            <InfoText>Annual appreciation</InfoText>
            <InfoValuationChange>
              {annualApreciatioPercentage}
            </InfoValuationChange>
          </AccountListItem>
        </AccountList>
      </AccountSection>

      {mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList>
              <AccountListItem>
                <InfoText>{currentBalanceInMortage}</InfoText>
              </AccountListItem>
              <AccountListItem>
                <InfoText>{account.associatedMortgages[0].name}</InfoText>
              </AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      )}
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};

export default Detail;
