import { useContext } from 'react'
import CartSummary from '../components/CartSummary/CartSummary'
import CartItem from '../components/CartItem/CartItem'
import { CartContext } from '../contexts/CartContext'


function Cart() {
    const {cartItems,totalPrice}= useContext(CartContext)
  return (
    <div>
     
        <ul>
        {cartItems.map(item => (
            <li key={item.clothId}>
                <CartItem item={item}/>
            </li>
        ))}
        </ul> 
      <CartSummary/>
      
    </div>
  )
}

export default Cart
