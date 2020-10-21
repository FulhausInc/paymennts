
const getTotalPaymentAmount = (charge, taxDetails) => {

  let totalTax = 0;
  taxDetails.forEach(tax=>{
totalTax = totalTax + (charge * tax.rate / 100)
  })

  const totalPaymentAmount = charge + totalTax;
  return parseFloat(totalPaymentAmount.toFixed(2));
};

export default getTotalPaymentAmount;
