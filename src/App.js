import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    //we have to add .json while using the firebase actually..
    // const sendCartData = async () => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "pending",
    //     title: "Sending..",
    //     message: "Sending cart data!",
    //   })
    // );
    // const response = await fetch(
    //   "https://booklist-43407-default-rtdb.firebaseio.com/cart.json",
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Sending cart data failed.");
    // }
    // const data = await response.json();
    // dispatch(
    //   uiActions.showNotification({
    //     status: "success",
    //     title: "Success...",
    //     message: "Sent cart data suceess!",
    //   })
    // );
    //   };
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    //calling catch so that if we catch any error it will show likewise..
    // sendCartData().catch((err) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "error",
    //     title: "Error!",
    //     message: "Sending cart data failed!",
    //   })
    //   // );
    // });
  }, [cart, dispatch]);
  //we adding cart as dependecy which means we will sent request whenver our cart is changing....
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
