import React from "react";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

const Layout = () => {
  const cartItems = useSelector((state) => state.cart.itemsList);
  let total = 0;
  if (cartItems) {
    cartItems.forEach((item) => {
      total += item.totalPrice;
    });
  }
  const isShowCart = useSelector((state) => state.ui.showCart);
  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {isShowCart && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
