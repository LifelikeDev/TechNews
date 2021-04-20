const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "DELETE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }

  // if (action.type === "INCREASE_AMOUNT") {
  //   let tempCart = state.cart.map((cartItem) => {
  //     if (cartItem.id === action.payload) {
  //       return { ...cartItem, amount: cartItem.amount + 1 };
  //     }
  //     return cartItem;
  //   });
  //   return { ...state, cart: tempCart };
  // }

  // if (action.type === "DECREASE_AMOUNT") {
  //   let temporaryCart = state.cart
  //     .map((cartItem) => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount - 1 };
  //       }
  //       return cartItem;
  //     })
  //     .filter((cartItem) => cartItem.amount !== 0); // taking out item whose amount is 0 from the list

  //   return { ...state, cart: temporaryCart };
  // }

  if (action.type === "TOTAL_ITEMS") {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem;
        const totalItemPrice = amount * price;

        cartTotal.total += totalItemPrice;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        amount: 0,
        total: 0,
      }
    );

    total = parseFloat(total.toFixed(2)); // return total price figure to 2 decimal place

    return { ...state, total, amount };
  }

  if (action.type === "PAGE_LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_DATA") {
    return { ...state, loading: false, cart: action.payload };
  }

  // handling both increase and decrease functionalities in one check
  if (action.type === "CHANGE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "increase") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "decrease") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: tempCart };
  }

  throw new Error("no matching action type found");
};

export default reducer;
