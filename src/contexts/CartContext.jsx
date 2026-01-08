import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [myOrders, setMyOrders] = useState([]);


   const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);


  function addToCart(item) {
    const itemId = item._id || item.id;
    setCartItems(prev => {
      const found = prev.find(oneItem => (oneItem._id || oneItem.id) === itemId);

      if (found) {
        return prev.map(oneItem =>
          (oneItem._id || oneItem.id) === itemId
            ? { ...oneItem, quantity: oneItem.quantity + 1 } : oneItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  
  function removeFromCart(clothId) {
    setCartItems(prev => prev.map(oneItem =>
          (oneItem._id || oneItem.id) === clothId ?
           { ...oneItem, quantity: oneItem.quantity - 1 }
            : oneItem
        ).filter(oneItem => oneItem.quantity > 0)
    );
  }


  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{cartItems,setCartItems,totalPrice, addToCart, removeFromCart, clearCart, myOrders, setMyOrders}}>
      {children}
    </CartContext.Provider>
  );
}


export { CartContext };