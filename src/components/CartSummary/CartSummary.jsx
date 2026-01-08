import React from 'react'
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';
import './CartSummary.css';

function CartSummary() {
  const {totalPrice} = useContext(CartContext);
  return (
    <div className="cart-summary">
        <div>
      <p className="total-price">Total Price: {totalPrice} BD</p>
      </div>
    </div>
  )
}

export default CartSummary
