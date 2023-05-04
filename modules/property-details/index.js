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
        <AccountLabel data-testid="valuation-title">
          Valuation Change
        </AccountLabel>
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
            <InfoValuationChange data-testid="annual-apreciation">
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
