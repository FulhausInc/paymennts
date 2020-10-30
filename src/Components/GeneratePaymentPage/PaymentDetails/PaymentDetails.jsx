import React from "react";
import "./PaymentDetails.scss";
import BannerImage from "../../../Images/banner.png";
import Logo from "../../../Logo/fulhaus-logo.png";
import formatAmountByCurrency from "../../../Functions/currencyFormatter";

const PaymentDetails = ({ paymentDetails, paymentID }) => {
  return (
    <div className="payment-details-wrapper" id="payment-details">
      <div
        className="payment-details-banner"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <div className="payment-details-header">
          <div
            className="payment-details-header-logo"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>
          <div className="payment-details-header-address">
            <h5>Fulhaus Inc</h5>
            <h5>6560 Avenue de l'Esplanade #020</h5>
            <h5>Montréal, QC H2V 4L5</h5>
            <h5>info@fulhaus.com</h5>
          </div>
        </div>
      </div>
      <div className="payment-details-subheader">
        <h5>
          Billed To: <span>{paymentDetails.payerName}</span>
        </h5>
        <h5>
          Payment ID: <span>{paymentID}</span>
        </h5>
      </div>
      <div className="payment-details-body">
        <div className="payment-details-body-header">
          <div className="item-1">SN</div>
          <div className="item-2">Description</div>
          <div className="item-3">Amount</div>
        </div>
        <div className="payment-details-body-details">
          <div className="item-1">
            <h3>1</h3>
          </div>
          <div className="item-2">
            <h3>{paymentDetails.description}</h3>
          </div>
          <div className="item-3">
            <h3>
              {formatAmountByCurrency(
                paymentDetails.chargeAmount ? paymentDetails.chargeAmount : 0,
                paymentDetails.currency ? paymentDetails.currency : "USD"
              )}
            </h3>
          </div>
        </div>
      </div>
      <div className="payment-details-totals">
        <h2>
          Total:{" "}
          <span>
            {formatAmountByCurrency(
              paymentDetails.chargeAmount ? paymentDetails.chargeAmount : 0,
              paymentDetails.currency ? paymentDetails.currency : "USD"
            )}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PaymentDetails;
