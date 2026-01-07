import React from 'react'

function OrderCard({order}) {

  return (
     <div className="order-card">
      <p>Order ID: {order._id}</p>
      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      <p>Total Price: {order.totalPrice} BD</p>
      <p>Status: {order.status}</p>
    </div>
  )
}

export default OrderCard
