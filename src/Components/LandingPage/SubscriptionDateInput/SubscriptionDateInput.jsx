import React, { useState, useEffect } from "react";
import "./SubscriptionDateInput.scss";
import Gap from "../../CommonComponents/Gap";
import Button from "../../CommonComponents/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import fetchUtil from "../../../Functions/fetchUtils";

const SubscriptionDateInput = (props) => {
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);

  useEffect(() => {
    setSubscriptionStartDate(props.subscriptionStartDate);
  }, [props]);

  const handleDeliveryDate = (date) => {
    setSubscriptionStartDate(date);
  };

  const handleStartSubscription = async (paymentUUID, startDate) => {
    console.log(paymentUUID, startDate);
    const subscriptionDetails = {
      paymentUUID,
      startDate,
    };

    let response = await fetchUtil(
      "/payments/start-subscription",
      "POST",
      subscriptionDetails
    );
    if (response.success) {
      console.log(response.message);
      props.onClose();
    } else {
      console.log(response.message);
    }
  };

  return (
    <div className="subscription-date-wrapper">
      <div className="subscription-date-input-form">
        <h5>Client:</h5>
        <Gap value="1rem" />
        <div>{props.paymentDetails?.payerName}</div>
      </div>
      <div className="subscription-date-input-form">
        <h5>Subscription Start Date:</h5>
        <Gap value="1rem" />
        <div className="subscription-date-input-form-details">
          <DatePicker
            className="subscription-date-input"
            selected={
              typeof subscriptionStartDate === "string"
                ? Date.parse(subscriptionStartDate)
                : subscriptionStartDate
            }
            minDate={subDays(new Date(), 1)}
            onChange={(d) => handleDeliveryDate(d)}
          />
        </div>
      </div>
      <Gap value="5rem" />
      <div className="subscription-date-start-button">
        <Button
          name="subscriptionDate"
          background="#ff4b30"
          borderRadius="0"
          width="100%"
          fontSize="calc(8px + 0.5vw)"
          enabled={subscriptionStartDate && subscriptionStartDate !== ""}
          padding="1rem 2rem"
          onClick={(e) =>
            handleStartSubscription(
              props.paymentDetails?.paymentUUID,
              subscriptionStartDate
            )
          }
          color="#ffffff"
          label="Start Subscription"
        />
      </div>
    </div>
  );
};

export default SubscriptionDateInput;
