import React from 'react'

function CartItem(setItemCount, item) {
  return (
    <div>
        <ul>
            <li key={item} className="cart-item">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button className="add-btn" onClick={() =>
                setItemCount(c => c + 1)} >
                    +
                </button>

                <button className="remove-btn" onClick={() =>
                setItemCount(c => c - 1)}>
                    -
                </button>

            </li>
        </ul>
    
    </div>
  )
}

export default CartItem
