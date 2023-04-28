import React from "react";

function PriceFormatter({ price }) {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const formattedPrice = formatter.format(price);

  return (
    <div>
      <p>{formattedPrice}</p>
    </div>
  );
}

export default PriceFormatter;
