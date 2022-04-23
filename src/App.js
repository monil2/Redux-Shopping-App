import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
// import { uiActions } from "./store/ui-slice";
import { fetchData, sendCartData } from "./store/cart-slice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const changed = useSelector((state) => state.ui.changed);
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (changed) {
      dispatch(sendCartData(cart));
    }
    // const sendRequest = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       message: "Updating Cart",
    //       type: "warning",
    //       open: true,
    //     })
    //   );
    //   const res = await fetch(
    //     process.env.REACT_APP_FIREBASE_URL,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   const data = await res.json();
    //   dispatch(
    //     uiActions.showNotification({
    //       message: "Cart Updated",
    //       type: "success",
    //       open: true,
    //     })
    //   );
    // };
    // sendRequest().catch((err) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       message: "Error occured in Updating Cart",
    //       type: "error",
    //       open: true,
    //     })
    //   );
    // });
  }, [cart, changed, dispatch]);
  return (
    <div className="App">
      {notification.open && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
