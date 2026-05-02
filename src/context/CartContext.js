// src/context/CartContext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        setMessage(`✅ Updated ${product.name} quantity`);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        setMessage(`✅ Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        setMessage(`❌ Removed ${item.name} from cart`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setMessage('🛒 Cart cleared');
  };

  // Clear message
  const clearMessage = () => {
    setMessage('');
  };

  // Toggle cart drawer
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Calculate total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate item count
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        message,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearMessage,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};