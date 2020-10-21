import React from "react";
import "./PaymentSuccessful.scss";
import { FiCheckCircle } from "react-icons/fi";

const PaymentSuccessful = (props) => {
  return (
    <div className="payment-successful-wrapper">
      <FiCheckCircle className="payment-successful-icon" />
      <h1>Payment Successful!</h1>
      <p>Thank you!</p>
    </div>
  );
};

export default PaymentSuccessful;
