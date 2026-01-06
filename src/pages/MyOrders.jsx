import React from 'react'
import OrderCard from '../components/OrderCard/OrderCard.jsx'
import { CartContext } from '../contexts/CartContext.jsx';
import { useContext } from 'react';

function MyOrders() {
    const {myOrders = []} = useContext(CartContext);
  return (
    <div>
      <h1>My Orders</h1>

        {myOrders.length === 0 ? (
        <p>No orders yet</p>
      ) : (

      <ul>
        {myOrders.map(order=>(
            <li key={order.id}>
                <OrderCard order={order}/>
            </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default MyOrders
