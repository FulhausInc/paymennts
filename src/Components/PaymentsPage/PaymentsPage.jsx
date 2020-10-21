import React, { useState, useEffect } from "react";
import "./PaymentsPage.scss";
import { BlockLoading } from "react-loadingg";
import fetchUtils from "../../Functions/fetchUtils";
import formatAmountByCurrency from "../../Functions/currencyFormatter";
import StripePayment from "./StripePayment/StripePayment";
import getTotalPaymentAmount from "../../Functions/getTotalPaymentAmount";
import CurrentPaymentSummary from "./CurrentPaymentSummary/CurrentPaymentSummary";
import { format } from "date-fns";
import CheckBox from "../CommonComponents/CheckBox";

const PaymentsPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [acceptedTNC, setAcceptedTNC] = useState(false);

  useEffect(() => {
    const pathArray = props.location.pathname.split("/");
    if (pathArray[pathArray.length - 1] === "") {
      pathArray.pop();
    }
    const pathName = pathArray[pathArray.length - 1];

    const fetchPaymentDetails = async (paymentDetailsUUID) => {
      let response = await fetchUtils(
        "/payments/details?UUID=" + paymentDetailsUUID,
        "GET",
        ""
      );

      if (response.success) {
        setPaymentDetails(response.data);
        console.log(response.data);
        setIsLoading(false);
      } else {
        console.log(response.message);
        setIsLoading(false);
      }
    };

    fetchPaymentDetails(pathName);
  }, []);

  const handleDownloadTNC = (event) => {
    window.open(
      "https://fulhaus-po-pdf.s3.us-east-2.amazonaws.com/USA+Template.Service.Agreement_NEW.pdf",
      "_blank"
    );
  };

  return isLoading ? (
    <div className="payments-page-wrapper">
      <BlockLoading color="#FF4E24" />
    </div>
  ) : (
    <div className="payments-page-wrapper">
      <div className="payments-page-left-section">
        <img
          src={paymentDetails.paymentDetailsImageURL}
          alt="Payment Details"
        ></img>
      </div>
      <div className="payments-page-right-section">
        <CurrentPaymentSummary paymentDetails={paymentDetails} />
        <div className="payments-page-tnc-row">
          <CheckBox
            backgroundColor="#FF4E24"
            checkIconColor="#ffffff"
            onClick={(v) => setAcceptedTNC(v)}
          />
          <p>
            {"By making this payment, you accept our "}{" "}
            <span onClick={(e) => handleDownloadTNC(e)}>
              {" service agreement"}
            </span>{" "}
            {" and authorize Fulhaus Inc. and Stripe, our payment service provider, to charge this card for this total amount" +
              (paymentDetails.recurringAmountDetails.length > 0
                ? " and the subsequent recurring payments"
                : ".") +
              "."}
          </p>
        </div>

        <StripePayment
          propsHistory={props.history}
          paymentDetails={paymentDetails}
          acceptedTNC={acceptedTNC}
          total={formatAmountByCurrency(
            getTotalPaymentAmount(
              paymentDetails.chargeAmount,
              paymentDetails.taxDetails
            ),
            paymentDetails.currency
          )}
        />
        {paymentDetails.recurringAmountDetails.length > 0 && (
          <div className="payments-page-next-payment-row">
            <div>
              <p>Next Payment:</p>
              <span>
                {" (" +
                  format(
                    new Date(paymentDetails.recurringAmountDetails[0].startAt),
                    "dd/MM/yyyy"
                  ) +
                  ")"}
              </span>
            </div>
            <p>
              {formatAmountByCurrency(
                getTotalPaymentAmount(
                  paymentDetails.recurringAmountDetails[0].amount,
                  paymentDetails.taxDetails
                ),
                paymentDetails.currency
              )}
              <span> + tax </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
