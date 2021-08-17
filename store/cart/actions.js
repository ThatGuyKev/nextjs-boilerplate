export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_ITEM_FROM_CART = "CLEAR_ITEM_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const APPLY_COUPON = "APPLY_COUPON";
export const APPLY_DISCOUNT = "APPLY_DISCOUNT";
export const REMOVE_COUPON = "REMOVE_COUPON";
export const REHYDRATE = "REHYDRATE";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const IS_IN_CART = "IS_IN_CART";
export const ADD_ADDRESS_CHECKOUT = "ADD_ADDRESS_CHECKOUT";

export const CHECKOUT = "CHECKOUT";

export const addItemHandler = (item, quantity = 1) => {
  return { type: ADD_ITEM, payload: { ...item, quantity } };
};

export const removeItemHandler = (item, quantity = 1) => {
  return { type: REMOVE_ITEM, payload: { ...item, quantity } };
};

export const clearItemFromCartHandler = (item) => {
  return { type: CLEAR_ITEM_FROM_CART, payload: item };
};

export const clearCartHandler = () => {
  return { type: CLEAR_CART };
};

export const couponHandler = (coupon) => {
  return { type: APPLY_COUPON, payload: coupon };
};

export const removeCouponHandler = () => {
  return { type: REMOVE_COUPON };
};

export const rehydrateLocalState = (payload) => {
  return { type: REHYDRATE, payload };
};

export const updateItemQuantity = (item, quantity) => {
  return { type: UPDATE_QUANTITY, payload: { ...item, quantity } };
};

export const applyDiscountHandler = (discount) => {
  return { type: APPLY_DISCOUNT, payload: discount };
};

export const addAddressCheckout = (address) => {
  return { type: ADD_ADDRESS_CHECKOUT, payload: address };
};
