import React from "react";
import "./CurrentPaymentSummary.scss";
import getTaxAmount from "../../../Functions/getTaxAmount";
import formatAmountByCurrency from "../../../Functions/currencyFormatter";
import getTotalPaymentAmount from "../../../Functions/getTotalPaymentAmount";

const CurrentPaymentSummary = ({ paymentDetails }) => {
  return (
    <div className="current-payment-summary-wrapper">
      <div className="current-payment-summary-row">
        <small>Client:</small>
        <p>{paymentDetails.payerName.toUpperCase()}</p>
      </div>
      <div className="current-payment-summary-row">
        <small>Payment ID:</small>
        <p>{paymentDetails.paymentID}</p>
      </div>
      <div className="current-payment-summary-row">
        <small>Shipping Address:</small>
        <p>{paymentDetails.shippingAddress}</p>
      </div>
      <div className="current-payment-summary-amount-details">
        <div className="current-payment-summary-amount-row">
          <p>Total Amount</p>
          <p>
            {formatAmountByCurrency(
              paymentDetails.chargeAmount,
              paymentDetails.currency
            )}
          </p>
        </div>
        {paymentDetails.taxDetails.map((tax, index) => {
          return (
            <div className="current-payment-summary-amount-row" key={index}>
              <p>{"Tax - " + tax.description}</p>
              <p>
                {formatAmountByCurrency(
                  getTaxAmount(paymentDetails.chargeAmount, tax),
                  paymentDetails.currency
                )}
              </p>
            </div>
          );
        })}
        <div className="current-payment-total-amount-row">
          <p>Total</p>
          <p>
            {formatAmountByCurrency(
              getTotalPaymentAmount(
                paymentDetails.chargeAmount,
                paymentDetails.taxDetails
              ),
              paymentDetails.currency
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentPaymentSummary;
