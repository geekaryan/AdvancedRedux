import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      state.changed = true;
      const newItem = action.payload; //actions what we are getting from the user..
      //here we are checking whether the item is already existed or not  by using find.. method basically
      //we are making array of items ..
      const existingItem = state.items.find((item) => item.id === newItem.id);
      //if the item is not already existed so basically what we are going to do we basically use the push method to add items in the array..
      state.totalQuantity++;
      if (!existingItem) {
        //state to item we go then we use push providing the already existing and adding newItems values to it...
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        //if the item is already existing we are going to increment the quantity, and totalPrice is equal to existing item price + newItem price...
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.changed = true;
      //we are expecting the item while removing so ya we put our payload equl to the id...
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === id);

      //if the quantity of the item is equal to 1 then we have to remove the item entirely so we are goona use filter method...
      //basically to remove something from the list we use filter method..
      if (existingItem.quantity === 1) {
        //so here we are bascially filtering out the item by simply calling that show only those items which are not equal to id..
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        //if the item is more than one then we simply goona decrement the quantity and the total Price is also gonna decrement by the original price of the item...
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
