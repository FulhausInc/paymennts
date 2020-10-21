import React, { useState } from "react";
import "./CheckoutForm.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import Button from "../../../CommonComponents/Button";
// import Gap from "../../../CommonComponents/Gap";
// import PageModal from "../../../CommonComponents/PageModal";
import PaymentSuccessful from "./PaymentSuccessful/PaymentSuccessful";
import { connect } from "react-redux";
import fetchUtil from "../../../../Functions/fetchUtils";

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const UnconnectedCheckoutForm = (props) => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showPaymentSuccessfulModal, setShowPaymentSuccessfulModal] = useState(
    false
  );
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event, nameOnCard) => {
    setProcessingPayment(true);

    const paymentElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: paymentElement,
    });
    if (error) {
      console.log("error", error);
      console.log(error.message);
      return;
    }

    const paymentData = {
      // bookingID: props.bookingID,
      // productID: props.productID,
      // nameOnCard: nameOnCard,
      // billingAddress: props.billingAddress,
      // paymentID: paymentMethod.id,
    };

    let response = await fetchUtil(
      "/payments/card/deposit",
      "POST",
      paymentData
    );
    if (response.success) {
      setProcessingPayment(false);
      setPaymentSuccessful(true);
      setShowPaymentSuccessfulModal(true);
    } else {
      setProcessingPayment(false);
      setPaymentSuccessful(false);
      console.log(response.message);
    }
  };

  const handleShowPaymentSuccessfulModal = (event) => {
    setShowPaymentSuccessfulModal(false);
  };

  const handleGoToShop = (event) => {
    setShowPaymentSuccessfulModal(false);
    props.propsHistory.push("/");
  };

  return (
    <React.Fragment>
      <div>
        <CardElement
          className="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">
          {error}
        </div>
        {
          // <Gap value="20px" />
          // <Button
          //   name="checkout"
          //   background="#f4bd9a"
          //   borderRadius="10px"
          //   border="1px solid #f4bd9a"
          //   width="100%"
          //   enabled={!processingPayment && !paymentSuccessful && props.nameOnCard}
          //   height="40px"
          //   padding="0"
          //   margin="0"
          //   onClick={(e) => handleSubmit(e, props.nameOnCard)}
          //   color="#1f1f1f"
          //   label={
          //     paymentSuccessful
          //       ? "Payment Successful!"
          //       : processingPayment
          //         ? "Processing..."
          //         : "PAY " + props.total
          //   }
          //   fontSize="calc(14px + 0.1vw)"
          // />
        }
      </div>
      {
        // <PageModal
        //   visible={showPaymentSuccessfulModal}
        //   component={
        //     <PaymentSuccessful
        //       propsHistory={props.propsHistory}
        //       goToShop={(e) => handleGoToShop(e)}
        //     />
        //   }
        //   onClose={(e) => handleShowPaymentSuccessfulModal(e)}
        // />
      }
    </React.Fragment>
  );
};

const CheckoutForm = connect()(UnconnectedCheckoutForm);

export default CheckoutForm;
