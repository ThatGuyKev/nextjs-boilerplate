import {
  ADD_ITEM,
  UPDATE_QUANTITY,
  REMOVE_COUPON,
  CLEAR_CART,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
  APPLY_COUPON,
  ADD_ADDRESS_CHECKOUT,
} from "./actions";
const initialState = {
  items: [],
  error: null,
  coupon: null,
  totalPrice: 0,
  totalDiscount: 0,
  discountTooltip: [],
  subTotal: 0,
  lastUpdated: 0,
  address: {},
};
export const cartItemsSubTotal = (items) => {
  const itemCost = items.reduce(
    (
      total,
      item
    ) => {
      if (item.salePrice) {
        return total + item.salePrice * item.quantity;
      }
      return total + item.price * item.quantity;
    },
    0
  );
  return itemCost;
};
export const cartItemsTotalPrice = (
  items,
  coupon = null,
) => {
  if (items === null || items.length === 0) return 0;
  const itemCost = items.reduce(
    (
      total,
      item
    ) => {
      if (item.salePrice) {
        return total + item.salePrice * item.quantity;
      }
      return total + item.price * item.quantity;
    },
    0
  );

  const couponDiscount = coupon
    ? ((itemCost * Number(coupon.discountInPercent)) / 100)
    : 0;

  return itemCost - couponDiscount;
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingCartItemIndex > -1) {
        const newState = [...state.items];
        newState[existingCartItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: newState,
          subTotal: cartItemsSubTotal(newState),
          totalPrice: cartItemsTotalPrice(
            newState,
            state.coupon,
            state.bundles
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        subTotal: cartItemsSubTotal([...state.items, action.payload]),
        totalPrice: cartItemsTotalPrice(
          [...state.items, action.payload],
          state.coupon,
          state.bundles
        ),
      };

    case UPDATE_QUANTITY:
      let index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const newState = [...state.items];
      newState[index].quantity = action.payload.quantity;

      return {
        ...state,
        items: newState,
        subTotal: cartItemsSubTotal(newState),

        totalPrice: cartItemsTotalPrice(newState, state.coupon, state.bundles),
      };
    case REMOVE_ITEM:
      let newItems = state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
          const newQuantity = item.quantity - action.payload.quantity;

          return newQuantity > 0
            ? [...acc, { ...item, quantity: newQuantity }]
            : [...acc];
        }
        return [...acc, item];
      }, []);
      return {
        ...state,
        items: newItems,
        subTotal: cartItemsSubTotal(newItems),
        totalPrice: cartItemsTotalPrice(newItems, state.coupon, state.bundles),
      };
    case CLEAR_ITEM_FROM_CART:
      let clearedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: clearedItems,
        subTotal: cartItemsSubTotal(clearedItems),

        totalPrice: cartItemsTotalPrice(
          clearedItems,
          state.coupon,
          state.bundles
        ),
      };
    case APPLY_COUPON:
      let couponTooltip = new Set(
        [
          ...state.discountTooltip,
          `Coupon -${action.payload.discountInPercent}%`,
        ].map((x) => x)
      );
      return {
        ...state,
        coupon: action.payload,
        subTotal: cartItemsSubTotal(state.items),
        totalPrice: cartItemsTotalPrice(
          state.items,
          action.payload,
          state.bundles
        ),
        discountTooltip: Array.from(couponTooltip),
      };
    case REMOVE_COUPON:
      return {
        ...state,
        coupon: null,
        totalPrice: cartItemsTotalPrice(state.items, null, state.bundles),
      };

    case CLEAR_CART:
      return initialState;


    case ADD_ADDRESS_CHECKOUT:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default Cart;
