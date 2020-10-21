import React, { useState, useEffect } from "react";
import "./PaymentsPage.scss";
import { BlockLoading } from "react-loadingg";
import fetchUtils from "../../Functions/fetchUtils";
import formatAmountByCurrency from "../../Functions/currencyFormatter";
import StripePayment from "./StripePayment/StripePayment";

const PaymentsPage = (props) => {
  const [paymentDetails, setPaymentDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        {" "}
        <StripePayment
          propsHistory={props.history}
          paymentDetails={paymentDetails}
          total={formatAmountByCurrency(
            paymentDetails.chargeAmount,
            paymentDetails.currency
          )}
        />
      </div>
    </div>
  );
};

export default PaymentsPage;
