import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../../types";

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface InitialState {
  cart: ProductData[];
  favorite: ProductData[];
  userInfo: UserInfo | null;
}

const initialState: InitialState = {
  cart: [],
  favorite: [],
  userInfo: null,
};

export const khanAuraSlice = createSlice({
  name: "khanaura",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductData>) => {
      const existingProduct = state.cart.find((item) => item._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity! += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingProduct = state.cart.find((item) => item._id === action.payload);
      if (existingProduct) {
        existingProduct.quantity! += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingProduct = state.cart.find((item) => item._id === action.payload);
      if (existingProduct && existingProduct.quantity! > 1) {
        existingProduct.quantity! -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    resetCart: (state) => {
      state.cart = [];
    },
    addToFavorite: (state, action: PayloadAction<ProductData>) => {
      const existingProduct = state.favorite.find((item) => item._id === action.payload._id);
      if (existingProduct) {
        state.favorite = state.favorite.filter((item) => item._id !== action.payload._id);
      } else {
        state.favorite.push(action.payload);
      }
    },
    resetFavorite: (state) => {
      state.favorite = [];
    },
    addUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart,
  addToFavorite,
  resetFavorite,
  addUser,
  removeUser,
} = khanAuraSlice.actions;

export default khanAuraSlice.reducer;
