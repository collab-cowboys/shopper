import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProductInCartQuantity, deleteCartProducts } from "../store/cart";

const CartEntry = (props) => {
  const { name, imageUrl, quantity, totalPrice, id } = props;
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const orderId = useSelector((state) => state.userOrder);
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <span>{name}</span>
        <img
          src={imageUrl}
          style={({ width: "auto" }, { height: 75 + "px" })}
        />
      </td>
      <td>
        <span>{quantity}</span>
        <button
          type="button"
          onClick={() =>
            dispatch(changeProductInCartQuantity({ name, changeValue: 1 }))
          }
        >
          +
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(changeProductInCartQuantity({ name, changeValue: -1 }))
          }
        >
          -
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() =>
            dispatch(
              deleteCartProducts({
                isLoggedIn: isLoggedIn,
                productId: id,
                orderId: orderId,
              })
            )
          }
        >
          X
        </button>
      </td>
      <td>
        <span>{totalPrice}</span>
      </td>
    </tr>
  );
};

export default CartEntry;
