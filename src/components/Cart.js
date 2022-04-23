import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const hanldeShowCart = () => {
    dispatch(uiActions.showCart());
  };
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <div className="cartIcon">
      <h3 onClick={hanldeShowCart}>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;
