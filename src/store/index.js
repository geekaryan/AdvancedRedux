import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./ui-slice.js";
import cartSliceReducer from "./cart-slice.js";

const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    cart: cartSliceReducer,
  },
});

export default store;
