import React from 'react'
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function CartItem({ item }) {
  const { removeFromCart , addToCart} = useContext(CartContext);
  return (
    <div>
        <ul>
            <li key={item._id || item.id} className="cart-item">
                <p>{item.name}</p>
                <p>{item.price} BD</p>
                <p>Quantity: {item.quantity}</p>

                <button className="add-btn" onClick={() =>
                addToCart(item)} >
                    +
                </button>

                <button className="remove-btn" onClick={() =>
                removeFromCart(item)}>
                    -
                </button>

            </li>
        </ul>
    
    </div>
  )
}

export default CartItem
