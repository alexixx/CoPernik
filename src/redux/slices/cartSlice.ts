import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TYPES

export type CartItemProps = {
  id: string
  title: string
  type: string,
  size: number,
  price: number,
  count?: number,
  imageUrl: string
}

// INTERFACES

interface CartSliceState  {
  totalPrice: number;
  items: CartItemProps[];
}


const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemProps>) {
      // Принимает объект

      const findItem  = state.items.find((obj) => obj.id == action.payload.id);
      
      if (findItem) {
        findItem.count = findItem.count && findItem.count + 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        
          return obj.price * (obj.count ? obj.count : 1) + sum; 
        
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id == action.payload);

      if (findItem?.count != 1 ) {
        findItem?.count && findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * (obj.count ? obj.count : 1) + sum;
      }, 0);
    },
    removeItem(state, action) {
      // Принимает id
      state.items = state.items.filter((obj) => obj.id != action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * (obj.count ? obj.count : 1) + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

//cartSlice.actions == cartSlice.reducers
export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
