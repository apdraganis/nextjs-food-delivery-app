import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    add(state, action) {
      state.totalAmount += action.payload.price * action.payload.amount

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];

      if (existingItem) {
        existingItem.amount += action.payload.amount
      } else {
        state.items.push(action.payload)
      };
      console.log(state)
    },
    remove(state, action) {


      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];

      state.totalAmount -= existingItem.price

      if (existingItem.amount === 1) {
        state.items.splice(existingCartItemIndex, 1);
      } else {
        existingItem.amount--
      }
    },
    clear(state) {
      state.items = [];
      state.totalAmount = 0;
      console.log('cleared!', state)
    }
  }
});

const reduxStore = configureStore({
  reducer: cartSlice.reducer
});

export const cartActions = cartSlice.actions;
export default reduxStore;