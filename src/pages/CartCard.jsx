import { useContext } from 'react'
import CartSummary from '../components/CartSummary/CartSummary'
import CartItem from '../components/CartItem/CartItem'
import { CartContext } from '../contexts/CartContext'
import CheckoutBtn from '../components/CheckoutBtn/CheckoutBtn'

function Cart() {
    const {cartItems,totalPrice}= useContext(CartContext)
  return (
    <div>
     
        <ul>
        {cartItems.map(item => (
            <li key={item._id || item.id}>
                <CartItem item={item}/>
            </li>
        ))}
        </ul> 
      <CartSummary/>
      <CheckoutBtn/>
      
    </div>
  )
}

export default Cart
