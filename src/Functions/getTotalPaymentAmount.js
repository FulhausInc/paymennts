const getTotalPaymentAmount = (charge, taxDetails) => {
  let totalTax = 0;
  taxDetails.forEach((tax) => {
    totalTax = totalTax + parseFloat(((charge * tax.rate) / 100).toFixed(2));
  });

  const totalPaymentAmount = charge + totalTax;
  return parseFloat(totalPaymentAmount.toFixed(2));
};

export default getTotalPaymentAmount;
