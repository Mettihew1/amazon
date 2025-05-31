import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ 
          ...action.payload, 
          quantity: action.payload.quantity || 1 
        });
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        if (state.items[index].quantity > (action.payload.quantity || 1)) {
          state.items[index].quantity -= action.payload.quantity || 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    removeItemCompletely: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateItemQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
    setBasketLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBasketError: (state, action) => {
      state.error = action.payload;
    }
  },
});

// Export actions
export const { 
  addToBasket,
  removeFromBasket,
  removeItemCompletely,
  updateItemQuantity,
  clearBasket,
  setBasketLoading,
  setBasketError
} = basketSlice.actions;

// Selectors
export const selectBasketItems = (state) => state.basket.items;
export const selectBasketTotal = (state) => 
  state.basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectBasketItemCount = (state) =>
  state.basket.items.reduce((count, item) => count + item.quantity, 0);
export const selectBasketLoading = (state) => state.basket.loading;
export const selectBasketError = (state) => state.basket.error;
export const selectItemQuantity = (id) => (state) => 
  state.basket.items.find(item => item.id === id)?.quantity || 0;

// Thunk for async operations (example)
export const syncBasketWithServer = () => async (dispatch, getState) => {
  try {
    dispatch(setBasketLoading(true));
    const { items } = getState().basket;
    // Example API call
    // await api.updateBasket(items);
    dispatch(setBasketLoading(false));
  } catch (error) {
    dispatch(setBasketError(error.message));
    dispatch(setBasketLoading(false));
  }
};

export default basketSlice.reducer;