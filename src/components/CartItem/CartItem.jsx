import React from 'react'
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import './CartItem.css';


function CartItem({ item }) {
  const { removeFromCart , addToCart} = useContext(CartContext);
  const itemId = item._id || item.id;
  return (
    <div>
        <ul>
            <li key={item._id || item.id} className="cart-item">
                <p>{item.name}</p>
                <p>{item.price} BD</p>
                <p>Quantity: {item.quantity}</p>

                {Array.isArray(item.images) && item.images.length > 0 && (
                  <div className="clothDetailImages">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="clothDetailImage"
                    />
                  </div>
                )}

                <button className="add-btn" onClick={() =>
                addToCart(item)} >
                    +
                </button>

                <button className="remove-btn" onClick={() =>
                removeFromCart(itemId)}>
                    -
                </button>

            </li>
        </ul>
    
    </div>
  )

}

export default CartItem

