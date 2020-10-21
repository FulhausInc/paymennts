import { createStore } from "redux";
import reducer from "./ReduxReducer";

const devTools = { tools: undefined };
if (process.env.REACT_APP_ENV === "development") {
  devTools.tools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const ReduxStore = createStore(
  reducer,
  {
        showImageInClientView: false,
    project: null,
        quoteID: null,
            quoteData: [],
    projectCurrency: "USD",
    totalQuoteAmount: 0,
    totalDiscount: 0,
    totalShipping: 0,
    totalDiscountType: "",
    totalShippingType: "",
    totalInstallation: 0,
    totalInstallationType: "",
    quoteDate: null,
    deliveryDate: new Date(),
    approved: false,
    paymentOption: "",
    rentalPriceIdentifier: "",
  },
  devTools.tools
);

export default ReduxStore;
