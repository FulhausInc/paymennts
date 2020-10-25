import React, { useState, useEffect } from "react";
import fetchUtil from "../../Functions/fetchUtils";
import "./LandingPage.scss";
import { connect } from "react-redux";
import { BlockLoading } from "react-loadingg";
import { v4 as uuidv4 } from "uuid";

const UnconnectedLandingPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAllPaymentDetails = async () => {
      let response = await fetchUtil("/payments/details", "GET", "");

      if (response.success) {
        props.dispatch({
          type: "set-allPaymentDetails",
          value: response.data,
        });

        console.log(response.data);
        setIsLoading(false);
      } else {
        console.log(response.message);
        setIsLoading(false);
      }
    };

    fetchAllPaymentDetails();
  }, []);

  return isLoading ? (
    <div className="quote-preview-wrapper-loader">
      <BlockLoading color="#FF4E24" />
    </div>
  ) : (
    <div className="landing-page-wrapper">
      <h1>All Payments</h1>
      {props.allPaymentDetails.map((paymentDetails) => {
        return (
          <div key={uuidv4()} className="landing-page-payment">
            <div
              onClick={() =>
                props.history.push("/generate?pid=" + paymentDetails.paymentID)
              }
            >
              {paymentDetails.paymentID}
            </div>
            <p>{paymentDetails.payerName}</p>
            <p>{paymentDetails.description}</p>
          </div>
        );
      })}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    allPaymentDetails: state.allPaymentDetails,
  };
};

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage);
export default LandingPage;
