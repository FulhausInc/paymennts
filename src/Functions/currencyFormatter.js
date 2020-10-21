const formatAmountByCurrency = (amount, currency) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency
  });

  return formatter.format(amount);
};

export default formatAmountByCurrency;
