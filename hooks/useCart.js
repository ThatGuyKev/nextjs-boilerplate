import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import {
  addItemHandler,
  updateItemQuantity,
  clearItemFromCartHandler,
  couponHandler,
  removeCouponHandler,
} from "store/cart/actions";
import baseUrl from "@/utils/baseUrl";

const useCart = () => {
  // Redux Hooks
  const cart = useSelector((s) => s.cart);
  // Actions
  const dispatch = useDispatch();

  const onAddToCart = useCallback(
    (item) => dispatch(addItemHandler(item)),
    [dispatch]
  );
  const applyCoupon = useCallback(
    ({ discountInPercent, code }) =>
      dispatch(couponHandler({ discountInPercent, code })),
    [dispatch]
  );
  const removeCoupon = useCallback(
    () => dispatch(removeCouponHandler()),
    [dispatch]
  );

  const onRemoveFromCart = useCallback(
    (item) => dispatch(clearItemFromCartHandler(item)),
    [dispatch]
  );

  // End of Redux Hooks =================================

  const removeFromCart = (id) => {
    onRemoveFromCart(cart.items?.filter((item) => item.id == id)[0]);
  };
  const isInCart = (id) => cart.items?.some((item) => item.id == id);

  const itemQuantity = (id) =>
    cart.items?.filter((item) => item.id == id)[0]?.quantity;

  const incrQty = (item) => {
    updateItemQuantity(item, itemQuantity(item.id) + 1);
  };

  const decQty = (item) => {
    if (itemQuantity(item.id) < 2) {
      onRemoveFromCart(cart.items?.filter((i) => i.id == item.id)[0]);
    } else {
      updateItemQuantity(item, itemQuantity(item.id) - 1);
    }
  };

  const totalCart = useMemo(
    () =>
      cart.items?.reduce(
        (acc, item) =>
          acc + parseInt(item.quantity),
        0
      ),
    [cart.items]
  );

  const handleCoupon = async (couponInput) => {
    let url = `${baseUrl}/coupons/${couponInput}`
    let { data } = await axios(url);
    if (!data.coupon.code) {
      removeCoupon();
      return false;
    } else {
      await applyCoupon({
        discountInPercent: data.coupon.discount,
        code: data.coupon.code,
      });
      return true;
    }
  };
  const calculateDiscount = useMemo(() => {

    const discount = cart.coupon
      ? ((cart.subTotal) * Number(cart.coupon?.discountInPercent)) / 100
      : 0;
    return (discount).toFixed(2);
  }, [cart.coupon, cart.items]);

  return {
    addToCart: onAddToCart,
    isInCart,
    itemQuantity,
    incrQty,
    decQty,
    updateItemQuantity,
    removeFromCart,
    totalCart,
    calculateDiscount,
    handleCoupon,
    items: cart.items,
    totalPrice: cart.totalPrice,
    coupon: cart.coupon,
  };
};

export default useCart;
