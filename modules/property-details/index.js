/* eslint-disable max-statements */
import { add, format } from "date-fns";
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
  StyledOriginalPursachePrice,
} from "./style";
import {
  priceFormatter,
  formatMonthYear,
  getYearsSincePurchase,
  getSincePurchase,
  getSincePurchasePercentage,
} from "../../helpers/helpers";
import PropTypes from "prop-types";
import Head from "next/head";

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
      <Head>
        <title>Property Account</title>
      </Head>
      <AccountSection>
        <AccountLabel role="heading" aria-level="2">
          Estimated Value
        </AccountLabel>
        <AccountHeadline>{recentValuationCost}</AccountHeadline>
        <AccountList role="list">
          <AccountListItem role="listitem">
            <InfoText>
              {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
            </InfoText>
          </AccountListItem>
          <AccountListItem role="listitem">
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
        <AccountLabel role="heading" aria-level="2">
          Property details
        </AccountLabel>
        <RowContainer>
          <AccountList role="list">
            <AccountListItem role="listitem">
              <InfoText>{account.name}</InfoText>
            </AccountListItem>
            <AccountListItem role="listitem">
              <InfoText>{account.bankName}</InfoText>
            </AccountListItem>
            <AccountListItem role="listitem">
              <InfoText>{account.postcode}</InfoText>
            </AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      <AccountSection>
        <AccountLabel
          role="heading"
          aria-level="2"
          data-testid="valuation-title"
        >
          Valuation Change
        </AccountLabel>
        <AccountList role="list">
          <AccountListItem role="listitem">
            <InfoText>
              Purchased for
              <StyledOriginalPursachePrice>
                {originalPurchaseCost}
              </StyledOriginalPursachePrice>
              {`in ${purshacedDate}`}
            </InfoText>
          </AccountListItem>
          <AccountListItem role="listitem">
            <InfoText>Since Purchased</InfoText>
            <InfoValuationChange>{sincePurchaseInfo}</InfoValuationChange>
          </AccountListItem>
          <AccountListItem role="listitem">
            <InfoText>Annual appreciation</InfoText>
            <InfoValuationChange data-testid="annual-apreciation">
              {annualApreciatioPercentage}
            </InfoValuationChange>
          </AccountListItem>
        </AccountList>
      </AccountSection>

      {mortgage && (
        <AccountSection>
          <AccountLabel role="heading" aria-level="2">
            Mortgage
          </AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList role="list">
              <AccountListItem role="listitem">
                <InfoText>{currentBalanceInMortage}</InfoText>
              </AccountListItem>
              <AccountListItem role="listitem">
                <InfoText>{account.associatedMortgages[0].name}</InfoText>
              </AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      )}
      <Button
        role="button"
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};

export default Detail;

Detail.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    recentValuation: PropTypes.shape({
      amount: PropTypes.number.isRequired,
    }).isRequired,
    originalPurchasePrice: PropTypes.number.isRequired,
    originalPurchasePriceDate: PropTypes.string.isRequired,
    associatedMortgages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        currentBalance: PropTypes.number.isRequired,
      })
    ),
    lastUpdate: PropTypes.string.isRequired,
    updateAfterDays: PropTypes.number.isRequired,
  }),
};
