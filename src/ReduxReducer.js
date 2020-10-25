const ReduxReducer = (state, action) => {
  if (action.type === "set-allPaymentDetails") {
    return {
      ...state,
      allPaymentDetails: action.value,
    };
  }

  return state;
};

export default ReduxReducer;
