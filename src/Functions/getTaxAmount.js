const getTaxAmount = (charge, tax) => {
  return parseFloat(((charge * tax.rate) / 100).toFixed(2));
};

export default getTaxAmount;
