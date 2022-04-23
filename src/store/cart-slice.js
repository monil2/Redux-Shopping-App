import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const exsistingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (exsistingItem) {
        exsistingItem.quantity++;
        exsistingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const exsistingItem = state.itemsList.find((item) => item.id === id);
      if (exsistingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        exsistingItem.quantity--;
        exsistingItem.totalPrice -= exsistingItem.price;
      }
    },
    replaceData(state, action) {
      state.itemsList = action.payload.itemsList;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          message: "Updating Cart",
          type: "warning",
          open: true,
        })
      );
      const res = await fetch(process.env.REACT_APP_FIREBASE_URL, {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          message: "Cart Updated",
          type: "success",
          open: true,
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      console.log(err);
      dispatch(
        uiActions.showNotification({
          message: "Error occured in Updating Cart",
          type: "error",
          open: true,
        })
      );
    }
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(process.env.REACT_APP_FIREBASE_URL);
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      if (cartData) {
        dispatch(cartActions.replaceData(cartData));
      }
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          message: "Error occured in Updating Cart",
          type: "error",
          open: true,
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
