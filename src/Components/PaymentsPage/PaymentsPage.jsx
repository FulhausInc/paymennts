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
import Button from "../CommonComponents/Button";

const PaymentsPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [acceptedTNC, setAcceptedTNC] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const handleShowPaymentModal = (showPaymentModalValue) => {
    setShowPaymentModal(!showPaymentModalValue);
  };

  return isLoading ? (
    <div className="payments-page-wrapper">
      <BlockLoading color="#FF4E24" />
    </div>
  ) : (
    <div className="payments-page-wrapper">
      {paymentDetails ? (
        <React.Fragment>
          <div
            className="payments-page-left-section"
            style={
              paymentDetails.paymentProcessed ? { overflow: "hidden" } : {}
            }
          >
            <img
              src={paymentDetails.paymentDetailsImageURL}
              alt="Payment Details"
              style={
                paymentDetails.paymentProcessed ? { filter: "blur(5px)" } : {}
              }
            ></img>
            {paymentDetails.paymentProcessed && (
              <div className="payments-page-left-section-overlay"></div>
            )}
          </div>
          <div
            className="payments-page-right-section-overlay"
            style={showPaymentModal ? { display: "flex" } : {}}
          >
            <div className="payments-page-right-section">
              {paymentDetails.paymentProcessed ? (
                <h6>The payment for this project has been finalized.</h6>
              ) : (
                <React.Fragment>
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
                              new Date(
                                paymentDetails.recurringAmountDetails[0].startAt
                              ),
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
                </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div
          className="payments-page-right-section"
          style={{ textAlign: "center", width: "100vw" }}
        >
          <h6>
            No payment details found, the link might be incorrect or has been
            changed.
          </h6>
        </div>
      )}

      {paymentDetails && (
        <div className="payments-page-popup-button-mobile">
          <Button
            name="checkout"
            background="#000000"
            borderRadius="10px"
            border="1px solid #fafafa"
            width="100%"
            enabled={true}
            height="40px"
            padding="0"
            margin="0"
            onClick={(e) => handleShowPaymentModal(showPaymentModal)}
            color="#ffffff"
            label={!showPaymentModal ? "Make Payment" : "Close"}
            fontSize="calc(14px + 0.1vw)"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
