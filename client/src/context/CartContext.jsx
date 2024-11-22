import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])

  const addBookToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };


  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  const clearCartItems = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  const createOrderPayload = (userId) => {
    return {
      user_id: userId,
      books: cartItems.map((item) => ({
        book_id: item.id,
        quantity: item.quantity,
      })),
    };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addBookToCart,
        removeItemFromCart,
        clearCartItems,
        getTotalPrice,
        createOrderPayload
      }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart ja esta sendo usado em CartProvider");
  }
  return context;
}