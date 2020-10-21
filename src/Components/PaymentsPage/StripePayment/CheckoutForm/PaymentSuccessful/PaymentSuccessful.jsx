import React from "react";
import "./PaymentSuccessful.scss";
import { FiCheck } from "react-icons/fi";

const PaymentSuccessful = (props) => {
  return (
    <div className="payment-successful-wrapper">
      <FiCheck className="payment-successful-icon" />
      <h1>Payment Successful!</h1>
      <p>Thank you!</p>
    </div>
  );
};

export default PaymentSuccessful;
