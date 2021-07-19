import React, { useState, useEffect, allPaymentDetails } from "react";
import fetchUtil from "../../Functions/fetchUtils";
import "./LandingPage.scss";
import { connect } from "react-redux";
import { BlockLoading } from "react-loadingg";
import { v4 as uuidv4 } from "uuid";
import { Fragment } from "react";
import Button from "../CommonComponents/Button";
import Gap from "../CommonComponents/Gap";
import { format } from "date-fns";

const UnconnectedLandingPage = ({ history, dispatch, allPaymentDetails }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAllPaymentDetails = async () => {
      let response = await fetchUtil("/payments/details", "GET", "");

      if (response.success) {
        dispatch({
          type: "set-allPaymentDetails",
          value: response.data,
        });

        setIsLoading(false);
      } else {
        console.log(response.message);
        setIsLoading(false);
      }
    };

    fetchAllPaymentDetails();
  }, []);

  const handleStartSubscription = async (pUUID) => {
    const subscriptionDetails = {
      paymentUUID: pUUID,
      startDate: new Date(),
    };

    let response = await fetchUtil(
      "/payments/start-subscription",
      "POST",
      subscriptionDetails
    );
    if (response.success) {
      console.log(response.message);
    } else {
      console.log(response.message);
    }
  };

  return isLoading ? (
    <div className="quote-preview-wrapper-loader">
      <BlockLoading color="#FF4E24" />
    </div>
  ) : (
    <section className="payments-landing-page">
      <h1>All Payments</h1>
      <div className="landing-page-wrapper">
        <table className="landing-page-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Payment ID</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Subscription</th>
              <th>Quote</th>
              <th>Processed</th>
            </tr>
          </thead>
          <tbody>
            {allPaymentDetails.map((paymentDetails, index) => {
              return (
                <tr key={index}>
                  <td>
                    {paymentDetails?.recurringAmountDetails?.length > 0
                      ? "Subscription"
                      : "One Time"}
                  </td>
                  <td>{paymentDetails?.paymentID}</td>
                  <td>{paymentDetails?.payerName}</td>
                  <td>
                    <Fragment>
                      {paymentDetails?.chargeAmount.toFixed(2)}
                      {paymentDetails?.paymentLink && (
                        <a href={paymentDetails.paymentLink} target="blank">
                          Payment Link
                        </a>
                      )}
                    </Fragment>
                  </td>
                  <td>
                    {paymentDetails?.recurringAmountDetails?.length > 0 && (
                      <div>
                        {paymentDetails?.recurringAmountDetails.map(
                          (recurringAmountDetails, index) => (
                            <small key={index}>{`${recurringAmountDetails?.name
                              ?.split("-")[0]
                              .trim()
                              .replace(
                                "Monthly ",
                                ""
                              )}: ${recurringAmountDetails?.amount?.toFixed(
                              2
                            )}`}</small>
                          )
                        )}
                        <Gap value="0.5rem" />
                        {paymentDetails?.paymentProcessed && (
                          <Fragment>
                            {paymentDetails?.subscriptionActive && (
                              <div className="landing-page-active-sub">
                                Active
                                <span>
                                  {`: 
                                    ${format(
                                      new Date(
                                        paymentDetails?.recurringAmountDetails?.[0].startAt
                                      ),
                                      "MMM dd, yyyy"
                                    )}
                                  `}
                                </span>
                              </div>
                            )}
                            {!paymentDetails?.subscriptionActive && (
                              <Button
                                name="start-sub"
                                background="#000000"
                                borderRadius="0"
                                enabled={true}
                                padding="0.5rem 1rem"
                                margin="0"
                                onClick={(e) =>
                                  handleStartSubscription(
                                    paymentDetails?.paymentUUID
                                  )
                                }
                                color="#ffffff"
                                label="Start Subscription"
                                fontSize="0.8rem"
                              />
                            )}
                          </Fragment>
                        )}
                      </div>
                    )}
                  </td>
                  <td>
                    {paymentDetails?.paymentDetailsURL && (
                      <a href={paymentDetails.paymentDetailsURL} target="blank">
                        {paymentDetails?.paymentDetailsURL}
                      </a>
                    )}
                  </td>
                  <td>{paymentDetails?.paymentProcessed ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <table className='landing-page-payments-container'>
          {allPaymentDetails.map((paymentDetails) => {
            return (

              <div key={uuidv4()} className='landing-page-payment'>
                <div
                  className='payment-id'
                  title={`View Payment Details`}
                  onClick={() =>
                    history.push('/generate?pid=' + paymentDetails.paymentID)
                  }
                >
                  {paymentDetails.paymentID}
                </div>
                <p className='payee-name'>{paymentDetails.payerName}</p>
                <p className='payment-details'>{paymentDetails.description}</p>
              </div>
            )
          })}
        </table> */}
      </div>
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    allPaymentDetails: state.allPaymentDetails,
  };
};

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage);
export default LandingPage;
