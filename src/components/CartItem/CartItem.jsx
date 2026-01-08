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
  <div className="cart-item-left">
    {Array.isArray(item.images) && item.images.length > 0 && (
      <img
        src={item.images[0]}
        alt={item.name}
        className="cartImg"
      />
    )}
  </div>

  <div className="cart-item-info">
    <p className="item-name">{item.name}</p>
    <p className="item-price">{item.price} BD</p>
    <p className="item-quantity">Quantity: {item.quantity}</p>
   
  </div>

  <div className="cart-item-actions">
    <button className="add-btn" onClick={() => addToCart(item)}>+</button>
    <button className="remove-btn" onClick={() => removeFromCart(item._id || item.id)}>-</button>
  </div>
</li>




        </ul>
    
    </div>
  )

}

export default CartItem

