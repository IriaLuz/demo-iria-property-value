export const PriceFormatter = (price) => {
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

export const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const getYearsSincePurchase = (originalPurchasePriceDate) =>
  new Date().getFullYear() - new Date(originalPurchasePriceDate).getFullYear();

export const getSincePurchase = (recentValuation, originalPurchasePrice) =>
  recentValuation.amount - originalPurchasePrice;

export const getSincePurchasePercentage = (
  recentValuation,
  originalPurchasePrice
) =>
  (getSincePurchase(recentValuation, originalPurchasePrice) /
    originalPurchasePrice) *
  100;
