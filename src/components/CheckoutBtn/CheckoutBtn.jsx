import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { createOrder } from "../../services/orderService";
import { useNavigate } from "react-router";

export default function CheckoutBtn() {
  const { cartItems, totalPrice, clearCart, setMyOrders } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
        const orderData = {
        items: cartItems.map(item => ({
            clothId: item._id,         
            price: item.price,
            quantity: item.quantity
        })),
        totalPrice
        };

        const newOrder = await createOrder(orderData, token);
        setMyOrders(prev => [...prev, newOrder]);
        clearCart();
        navigate('/my-orders');
        
    } catch (error) {
     console.error("Error during checkout:", error);
    }
    
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
