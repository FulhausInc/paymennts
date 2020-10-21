const ReduxReducer = (state, action) => {

    if (action.type === "set-showImageInClientView") {
    return {
      ...state,
      showImageInClientView: action.value,
    };
  }

      if (action.type === "set-project") {
    return {
      ...state,
      project: action.value,
    };
  }

        if (action.type === "set-quoteID") {
    return {
      ...state,
      quoteID: action.value,
    };
  }

    if (action.type === "set-quoteData") {
    return {
      ...state,
      quoteData: action.value,
    };
  }

            if (action.type === "set-projectCurrency") {
    return {
      ...state,
      projectCurrency: action.value,
    };
  }

            if (action.type === "set-totalQuoteAmount") {
    return {
      ...state,
      totalQuoteAmount: action.value,
    };
  }

            if (action.type === "set-totalDiscount") {
    return {
      ...state,
      totalDiscount: action.value,
    };
  }


              if (action.type === "set-totalShipping") {
    return {
      ...state,
      totalShipping: action.value,
    };
  }

              if (action.type === "set-totalDiscountType") {
    return {
      ...state,
      totalDiscountType: action.value,
    };
  }

                if (action.type === "set-totalShippingType") {
    return {
      ...state,
      totalShippingType: action.value,
    };
  }

                if (action.type === "set-totalInstallation") {
    return {
      ...state,
      totalInstallation: action.value,
    };
  }

                if (action.type === "set-totalInstallationType") {
    return {
      ...state,
      totalInstallationType: action.value,
    };
  }


                  if (action.type === "set-quoteDate") {
    return {
      ...state,
      quoteDate: action.value,
    };
  }


                    if (action.type === "set-deliveryDate") {
    return {
      ...state,
      deliveryDate: action.value,
    };
  }


                      if (action.type === "set-approved") {
    return {
      ...state,
      approved: action.value,
    };
  }

                        if (action.type === "set-paymentOption") {
    return {
      ...state,
      paymentOption: action.value,
    };
  }

                      if (action.type === "set-rentalPriceIdentifier") {
    return {
      ...state,
      rentalPriceIdentifier: action.value,
    };
  }


  return state;
};

export default ReduxReducer;
