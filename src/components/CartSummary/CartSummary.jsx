import React from 'react'
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";


function CartSummary() {
  const {totalPrice} = useContext(CartContext);
  return (
    <div className="cart-summary">
        <div>
      <p className="total-price">Total Price: {totalPrice} BD</p>
      <button className="checkout-btn">Checkout →</button>
      </div>
    </div>
  )
}

export default CartSummary
