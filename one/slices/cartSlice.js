import { createSlice } from "@reduxjs/toolkit";

// 🔄 Load all user carts from localStorage
const loadCartFromStorage = () => {
  const stored = localStorage.getItem("allCartItems");
  return stored ? JSON.parse(stored) : {};
};

const initialState = {
  cartItems: loadCartFromStorage(), // { userId: [items] }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, cartItem } = action.payload;

      if (!state.cartItems[userId]) {
        state.cartItems[userId] = [];
      }

      const existingItemIndex = state.cartItems[userId].findIndex(
        (item) => item._id === cartItem._id && item.size === cartItem.size
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        state.cartItems[userId][existingItemIndex].quantity +=
          cartItem.quantity || 1;
      } else {
        // New item, set initial quantity
        state.cartItems[userId].push({
          ...cartItem,
          quantity: cartItem.quantity || 1,
        });
      }

      localStorage.setItem("allCartItems", JSON.stringify(state.cartItems));
    },

    increaseItemQuantity: (state, action) => {
      const { userId, itemId, size } = action.payload;
      const item = state.cartItems[userId]?.find(
        i => i._id === itemId && i.size === size
      )

      if (item) {
        item.quantity += 1;
        localStorage.setItem("allCartItems", JSON.stringify(state.cartItems));
      }
    },

    decreaseItemQuantity: (state, action) => {
      const { userId, itemId, size } = action.payload;
      const item = state.cartItems[userId]?.find(
        i => i._id === itemId && i.size === size
      )

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("allCartItems", JSON.stringify(state.cartItems));
      } 
    },

    removeFromCart: (state, action) => {
      const { userId, cartItemId } = action.payload;

      if (state.cartItems[userId]) {
        state.cartItems[userId] = state.cartItems[userId].filter(
          (item) => item._id !== cartItemId
        );

        localStorage.setItem("allCartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state, action) => {
      const { userId } = action.payload;

      if (state.cartItems[userId]) {
        state.cartItems[userId] = [];

        localStorage.setItem("allCartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
