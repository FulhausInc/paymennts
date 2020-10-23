import React, { useState, useEffect } from "react";
import "./StripePayment.scss";
import InputBox from "../../CommonComponents/InputBox";
import Gap from "../../CommonComponents/Gap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { validateTextRequired } from "../../../Functions/validateInputs";

const StripePayment = (props) => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [stripePromise, setStripePromise] = useState("");

  useEffect(() => {
    setShowForm(true);
    setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY));
    setShowForm(true);
  }, []);

  return (
    <div className="stripe-payment-wrapper">
      {showForm && (
        <div className="stripe-payment-form">
          <h3>Debit or Credit card</h3>
          <h5>Name on Card</h5>
          <InputBox
            name="nameOnCard"
            type="text"
            background="#F5F6FA"
            border="1px solid #DCE1EB"
            borderRadius="5px"
            width="100%"
            height="40px"
            padding="0 calc(2px + 1vw)"
            margin="0"
            fontSize="calc(14px + 0.1vw)"
            placeholder="Name on card"
            value={nameOnCard}
            validation={validateTextRequired(nameOnCard)}
            validationErrorMessage="Exact name on card is required"
            onChange={(event) => setNameOnCard(event.target.value)}
          />
          <Gap value="10px" />

          <h5>Card Details</h5>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              paymentDetails={props.paymentDetails}
              propsHistory={props.propsHistory}
              nameOnCard={nameOnCard}
              acceptedTNC={props.acceptedTNC}
              total={props.total}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default StripePayment;
