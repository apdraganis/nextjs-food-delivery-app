import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface Item {
  id: string;
  name: string;
  amount: number;
  price: number;
}

interface DefaultCart {
  items: Item[];
  totalAmount: number;
}

const initialCartState: DefaultCart = {
  items: [],
  totalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    add(state, action) {
      state.totalAmount += action.payload.item.price * action.payload.item.amount

      const existingCartItemIndex = state.items.findIndex(
        (item: Item) => item.id === action.payload.item.id
      );
      const existingItem = state.items[existingCartItemIndex];

      if (existingItem) {
        existingItem.amount += action.payload.item.amount
      } else {
        state.items.concat(action.payload.item)
      };

    },
    remove(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item: Item) => item.id === action.payload.item.id
      );
      const existingItem = state.items[existingCartItemIndex];

      if (existingItem.amount === 1) {
        state.items.splice(existingCartItemIndex, 1);
      } else {
        existingItem.amount -= action.payload.item.amount
      }
    },
    clear(state) {
      state = initialCartState;
    }
  }
});

const reduxStore = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

export const cartActions = cartSlice.actions;
export default reduxStore;