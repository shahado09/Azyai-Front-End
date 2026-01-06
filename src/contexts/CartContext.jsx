import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

   const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);


  function addToCart(item) {
    setCartItems(prev => {
      const found = prev.find(oneItem => oneItem.clothId === item.clothId);

      if (found) {
        return prev.map(oneItem =>
          oneItem.clothId === item.clothId
            ? { ...oneItem, quantity: oneItem.quantity + 1 } : oneItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  
  function removeFromCart(clothId) {
    setCartItems(prev => prev.map(oneItem =>
          oneItem.clothId === clothId ?
           { ...oneItem, quantity: oneItem.quantity - 1 }
            : oneItem
        ).filter(oneItem => oneItem.quantity > 0)
    );
  }


  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{cartItems,setCartItems,totalPrice, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}


export { CartContext };