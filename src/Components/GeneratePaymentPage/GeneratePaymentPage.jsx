import React, { useState, useEffect } from "react";
import {
  validateFullName,
  validateTextRequired,
} from "../../Functions/validateInputs";
import DropDownList from "../CommonComponents/DropDownList";
import InputBox from "../CommonComponents/InputBox";
import "./GeneratePaymentPage.scss";
import ChevronDown from "../../Icons/chevron_down.png";
import paymentIDGenerator from "../../Functions/paymentIDGenerator";
import Line from "../CommonComponents/Line";
import Button from "../CommonComponents/Button";
import copyOfArrayOrObject from "../../Functions/copyOfArrayOrObject";
import fetchUtil from "../../Functions/fetchUtils";
import html2canvas from "html2canvas";
import { connect } from "react-redux";
import { BlockLoading } from "react-loadingg";
import PaymentDetails from "./PaymentDetails/PaymentDetails";

const UnconnectedGeneratePaymentPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({
    recurringAmountDetails: [],
    taxDetails: [],
    email: null,
    shippingAddress: null,
    billingAddress: null,
    nameOnCard: null,
    phoneNumber: null,
  });
  const [paymentID, setPaymentID] = useState("");
  const [showSelectRegionError, setShowSelectRegionError] = useState(false);
  const [showSelectCurrencyError, setShowSelectCurrencyError] = useState(false);
  const [generatingPaymentLink, setGeneratingPaymentLink] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  useEffect(() => {
    setPaymentID(paymentIDGenerator(7));

    const pid = new URLSearchParams(props.location.search).get("pid");

    const fetchPaymentDetails = async (paymentID) => {
      let response = await fetchUtil(
        "/payments/details/ID/" + paymentID,
        "GET",
        ""
      );

      if (response.success) {
        setPaymentID(pid);
        setPaymentDetails(response.data);
        setPaymentLink(response.data.paymentLink);
        setIsLoading(false);
      } else {
        console.log(response.message);
        setIsLoading(false);
      }
    };

    if (pid) {
      console.log(pid);
      fetchPaymentDetails(pid);
    }

    props.allPaymentDetails.forEach((paymentDetails) => {
      if (paymentDetails.paymentID === pid) {
        console.log(paymentDetails.paymentID);
        setPaymentID(pid);
        setPaymentDetails(paymentDetails);
        setPaymentLink(paymentDetails.paymentLink);
      }
    });
    setIsLoading(false);
  }, []);

  //   const add_months = (date, n) => {
  //     return new Date(date.setMonth(date.getMonth() + n));
  //   };

  //   const recurringAmountDetails = [
  //     {
  //       name: "Monthly Payment",
  //       amount: 0,
  //       interval: "month",
  //       startAt: add_months(new Date(), 1),
  //       iterations: 12,
  //       description: "payment",
  //     },
  //     {
  //       name: "Monthly Payment",
  //       amount: 0,
  //       interval: "month",
  //       startAt: add_months(new Date(), 13),
  //       iterations: 12,
  //       description: "payment",
  //     },
  //   ];

  // if (shippingDestinationCountry === "Canada") {
  //   taxDetails = [
  //     { description: "GST", rate: 5 },
  //     { description: "QST", rate: 9.975 },
  //   ];
  // }

  // const paymentDetailsaols = {
  //   paymentID: props.quoteID.quoteID,
  //   currency: props.projectCurrency,
  //   paymentOption: props.paymentOption,
  //   paymentDetailsBase64ImageDataURL: null,
  //   paymentDetailsBase64ImageFileName: props.quoteID.quoteID,
  //   chargeAmount,
  //   description: props.quoteID.quoteID + " rental pymt upfront - Fulhaus",
  //   recurringAmountDetails,
  //   taxDetails,
  //   shippingDestinationCountry,
  //   shippingAddress: props.project["Project Address"],
  //   billingAddress: null,
  //   payerName: props.project.org_name,
  //   nameOnCard: null,
  //   email: null,
  //   phoneNumber: null,
  // };

  const handlePaymentDetails = (event) => {
    const copyOfPaymentDetails = copyOfArrayOrObject(paymentDetails);
    copyOfPaymentDetails[event.target.name] = event.target.value;
    setPaymentDetails(copyOfPaymentDetails);
  };

  const handleSelectedCurrency = (event) => {
    const copyOfPaymentDetails = copyOfArrayOrObject(paymentDetails);
    copyOfPaymentDetails.currency = event.target.name;
    setPaymentDetails(copyOfPaymentDetails);
  };

  const handleShippingDestinationCountry = (event) => {
    const copyOfPaymentDetails = copyOfArrayOrObject(paymentDetails);
    copyOfPaymentDetails.shippingDestinationCountry = event.target.name;
    setPaymentDetails(copyOfPaymentDetails);
  };

  const handleGeneratePayment = async () => {
    setShowSelectRegionError(false);
    setShowSelectCurrencyError(false);

    if (!paymentDetails.shippingDestinationCountry) {
      setShowSelectRegionError(true);
      return;
    }

    if (!paymentDetails.currency) {
      setShowSelectCurrencyError(true);
      return;
    }

    if (
      !validateFullName(paymentDetails.payerName) ||
      !validateTextRequired(paymentDetails.chargeAmount) ||
      !validateTextRequired(paymentDetails.description)
    ) {
      return;
    }

    setGeneratingPaymentLink(true);
    const copyOfPaymentDetails = copyOfArrayOrObject(paymentDetails);
    copyOfPaymentDetails.paymentID = paymentID;
    copyOfPaymentDetails.paymentDetailsBase64ImageFileName = paymentID;

    let taxDetails = [];

    if (paymentDetails.shippingDestinationCountry === "Canada") {
      taxDetails = [
        { description: "GST", rate: 5 },
        { description: "QST", rate: 9.975 },
      ];
    }
    copyOfPaymentDetails.taxDetails = taxDetails;
    copyOfPaymentDetails.chargeAmount = parseFloat(paymentDetails.chargeAmount);

    const response = await fetchUtil(
      "/payments/create-payment-details",
      "POST",
      copyOfPaymentDetails
    );
    if (response.success) {
      setPaymentLink(response.paymentLink);
      setGeneratingPaymentLink(false);
    } else {
      console.log(response.message);
      setGeneratingPaymentLink(false);
    }
  };

  return isLoading ? (
    <div className="quote-preview-wrapper-loader">
      <BlockLoading color="#FF4E24" />
    </div>
  ) : (
    <div className="generate-payment-page-wrapper">
      <div className="generate-payment-page-left-section">
        <h3>
          payment ID: <span>{paymentID}</span>
        </h3>
        <h6>Payer Details</h6>
        <Line width="100%" height="1px" color="#F5F6FA" />
        <div className="generate-payment-page-input-wrapper">
          <h5>Full Name</h5>
          <InputBox
            name="payerName"
            type="text"
            background="#F5F6FA"
            border="1px solid #DCE1EB"
            borderRadius="5px"
            width="100%"
            height="40px"
            padding="0 calc(2px + 1vw)"
            margin="0"
            fontSize="calc(14px + 0.1vw)"
            // placeholder="Amount"
            value={paymentDetails.payerName}
            validation={validateFullName(paymentDetails.payerName)}
            validationErrorMessage="Payer full name is required"
            onChange={(event) => handlePaymentDetails(event)}
          />
        </div>
        <div className="generate-payment-page-input-row">
          <div
            className="generate-payment-page-input-wrapper"
            style={{ width: "57%" }}
          >
            <h5>Shipping Address</h5>
            <InputBox
              name="shippingAddress"
              type="text"
              background="#F5F6FA"
              border="1px solid #DCE1EB"
              borderRadius="5px"
              width="100%"
              height="40px"
              padding="0 calc(2px + 1vw)"
              margin="0"
              fontSize="calc(14px + 0.1vw)"
              // placeholder="Amount"
              value={paymentDetails.shippingAddress}
              onChange={(event) => handlePaymentDetails(event)}
            />
          </div>
          <div
            className="generate-payment-page-input-wrapper"
            style={{ width: "40%" }}
          >
            <h5>Region</h5>
            <DropDownList
              label={
                paymentDetails.shippingDestinationCountry
                  ? paymentDetails.shippingDestinationCountry
                  : "Select"
              }
              labelFontSize="calc(14px + 0.2vw)"
              labelBackground="#F5F6FA"
              labelBorder="1px solid #DCE1EB"
              labelBorderRadius="5px"
              labelColor="#1f1f1f"
              labelAlign="space-between"
              labelHeight="40px"
              labelWidth="100%"
              labelPadding="0 calc(5px + 0.5vw)"
              listItems={["Canada", "USA", "Europe", "UK"]}
              icon={ChevronDown}
              iconSize="10px"
              listAlign="left"
              listPadding=" 15px calc(8px + 1vw)"
              listMargin="0 0 calc(2px + 0.5vw) 0"
              listItemHoverBackground="#FF4E24"
              resetLabel={true}
              resetLabelOnChange={true}
              iconColorInvert={true}
              onSelect={(e) => handleShippingDestinationCountry(e)}
            />
            {showSelectRegionError && (
              <small className="generate-payment-page-input-error">
                Select Region
              </small>
            )}
          </div>
        </div>
        <div className="generate-payment-page-input-wrapper">
          <h5>Email</h5>
          <InputBox
            name="email"
            type="text"
            background="#F5F6FA"
            border="1px solid #DCE1EB"
            borderRadius="5px"
            width="100%"
            height="40px"
            padding="0 calc(2px + 1vw)"
            margin="0"
            fontSize="calc(14px + 0.1vw)"
            // placeholder="Amount"
            value={paymentDetails.email}
            onChange={(event) => handlePaymentDetails(event)}
          />
        </div>

        <h6>Transaction Details</h6>
        <Line width="100%" height="1px" color="#F5F6FA" />
        <div className="generate-payment-page-input-row">
          <div
            className="generate-payment-page-input-wrapper"
            style={{ width: "63%" }}
          >
            <h5>Amount</h5>
            <InputBox
              name="chargeAmount"
              type="number"
              background="#F5F6FA"
              border="1px solid #DCE1EB"
              borderRadius="5px"
              width="100%"
              height="40px"
              padding="0 calc(2px + 1vw)"
              margin="0"
              fontSize="calc(14px + 0.1vw)"
              //   placeholder="Payer full name"
              value={paymentDetails.chargeAmount}
              validation={validateTextRequired(paymentDetails.chargeAmount)}
              validationErrorMessage="Amount is required"
              onChange={(event) => handlePaymentDetails(event)}
            />
          </div>
          <div
            className="generate-payment-page-input-wrapper"
            style={{ width: "35%" }}
          >
            <h5>Currency</h5>
            <DropDownList
              label={
                paymentDetails.currency ? paymentDetails.currency : "Select"
              }
              labelFontSize="calc(14px + 0.2vw)"
              labelBackground="#F5F6FA"
              labelBorder="1px solid #DCE1EB"
              labelBorderRadius="5px"
              labelColor="#1f1f1f"
              labelAlign="space-between"
              labelHeight="40px"
              labelWidth="100%"
              labelPadding="0 calc(5px + 0.5vw)"
              listItems={["CAD", "USD", "EUR", "GBP"]}
              icon={ChevronDown}
              iconSize="10px"
              listAlign="left"
              listPadding=" 15px calc(8px + 1vw)"
              listMargin="0 0 calc(2px + 0.5vw) 0"
              listItemHoverBackground="#FF4E24"
              resetLabel={true}
              resetLabelOnChange={true}
              iconColorInvert={true}
              onSelect={(e) => handleSelectedCurrency(e)}
            />
            {showSelectCurrencyError && (
              <small className="generate-payment-page-input-error">
                Select Currency
              </small>
            )}
          </div>
        </div>
        <div className="generate-payment-page-input-wrapper">
          <h5>Description</h5>
          <InputBox
            name="description"
            type="text"
            background="#F5F6FA"
            border="1px solid #DCE1EB"
            borderRadius="5px"
            width="100%"
            height="40px"
            padding="0 calc(2px + 1vw)"
            margin="0"
            fontSize="calc(14px + 0.1vw)"
            //   placeholder="Payer full name"
            value={paymentDetails.description}
            validation={validateTextRequired(paymentDetails.description)}
            validationErrorMessage="A description of the payment is required"
            onChange={(event) => handlePaymentDetails(event)}
          />
        </div>
        <div className="generate-payment-page-generate-button-wrapper">
          <Button
            name="generate"
            background="#000000"
            borderRadius="10px"
            border="1px solid #fafafa"
            width="50%"
            enabled={!generatingPaymentLink && !paymentDetails.paymentProcessed}
            height="40px"
            padding="0"
            margin="0"
            onClick={(e) => handleGeneratePayment(e, props.nameOnCard)}
            color="#ffffff"
            label={
              generatingPaymentLink
                ? "Generating Payment Link ..."
                : paymentDetails.paymentProcessed
                ? "Payment Processed"
                : paymentDetails.paymentLink
                ? "Regenerate Payment Link"
                : "Generate Payment Link"
            }
            fontSize="calc(14px + 0.1vw)"
          />
        </div>
      </div>
      <div className="generate-payment-page-right-section">
        <h5>Preview</h5>
        <PaymentDetails paymentDetails={paymentDetails} paymentID={paymentID} />
        {paymentLink && (
          <div className="generate-payment-page-payment-link-wrapper">
            <p>PaymentLink:</p>

            <a href={paymentLink}>{paymentLink}</a>
          </div>
        )}
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    allPaymentDetails: state.allPaymentDetails,
  };
};

let GeneratePaymentPage = connect(mapStateToProps)(
  UnconnectedGeneratePaymentPage
);

export default GeneratePaymentPage;
