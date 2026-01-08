import React, { useEffect } from 'react'
import OrderCard from '../components/OrderCard/OrderCard.jsx'
import { CartContext } from '../contexts/CartContext.jsx';
import { useContext } from 'react';
import { getMyOrders } from '../services/orderService.js';

function MyOrders() {
    const {myOrders = [], setMyOrders} = useContext(CartContext);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getMyOrders(token);
                setMyOrders(orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        if (token) {
            fetchOrders();
        }
    }, [token, setMyOrders]);

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
