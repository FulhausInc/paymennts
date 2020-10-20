const ReduxReducer = (state, action) => {
  if (action.type === "set-quoteData") {
    return {
      ...state,
      quoteData: action.value,
    };
  }

  return state;
};

export default ReduxReducer;
