import React, { useContext, useReducer, useEffect } from "react";
import { cartItems } from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const defaultState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const emptyCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const deleteItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  // const increaseAmount = (id) => {
  //   dispatch({ type: "INCREASE_AMOUNT", payload: id });
  // };

  // const decreaseAmount = (id) => {
  //   dispatch({ type: "DECREASE_AMOUNT", payload: id });
  // };

  // const fetchData = async () => {
  //   dispatch({ type: "PAGE_LOADING" });
  //   const response = await fetch(url);
  //   const cart = await response.json();
  //   dispatch({ type: "DISPLAY_DATA", payload: cart });
  // };

  const changeAmount = (id, type) => {
    dispatch({ type: "CHANGE_AMOUNT", payload: { id, type } });
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    dispatch({ type: "TOTAL_ITEMS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        emptyCart,
        deleteItem,
        // increaseAmount,
        // decreaseAmount,
        changeAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
