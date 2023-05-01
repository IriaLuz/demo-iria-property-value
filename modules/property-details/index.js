/* eslint-disable max-statements */
import { add, format } from "date-fns";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import styled from "styled-components";
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
import {
  priceFormatter,
  formatMonthYear,
  getYearsSincePurchase,
  getSincePurchase,
  getSincePurchasePercentage,
} from "../helpers";

const StyledOriginalPursachePrice = styled.span`
  font-weight: 600;
`;

const Detail = ({ account }) => {
  const {
    recentValuation,
    originalPurchasePrice,
    originalPurchasePriceDate,
    recentValuation: { amount },
    associatedMortgages: [{ currentBalance }],
  } = account;

  const mortgage = account.associatedMortgages.length
    ? account.associatedMortgages[0]
    : null;
  const lastUpdate = new Date(account.lastUpdate);

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

  const originalPurchaseCost = priceFormatter(originalPurchasePrice);
  const recentValuationCost = priceFormatter(amount);
  const currentBalanceInMortage = priceFormatter(currentBalance);

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
              Purchased for
              <StyledOriginalPursachePrice>
                {originalPurchaseCost}
              </StyledOriginalPursachePrice>
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
