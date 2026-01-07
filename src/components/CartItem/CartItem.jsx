import React from 'react'
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function CartItem({ item }) {
  const { removeFromCart , addToCart} = useContext(CartContext);
    const itemId = item._id || item.id;
  return (
   <div className="cart-item">

    {Array.isArray(item.images) && item.images.length > 0 && (
      <div className="clothDetailImages">
        <img
          src={item.images[0]}
          alt={item.name}
          className="clothDetailImage"
        />
      </div>
    )}

      <p>{item.name}</p>
      <p>{item.price} BD</p>
      <p>Quantity: {item.quantity}</p>

      <button className="add-btn" onClick={() => addToCart(item)}>
        +
      </button>

      <button className="remove-btn" onClick={() => removeFromCart(itemId)}>
        -
      </button>
    </div>
  );

}

export default CartItem

