// import { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Load cart from localStorage or backend
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [user]);

  // Save cart to localStorage for non-authenticated users
  useEffect(() => {
    if (!user && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await API.get("/cart");
      setCart(response.data.items);
      setError(null);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      if (user) {
        const response = await API.post("/cart/add", {
          productId: product._id,
          quantity,
        });
        setCart(response.data.items);
      } else {
        setCart((prevCart) => {
          const existingItem = prevCart.find(
            (item) => item._id === product._id
          );
          if (existingItem) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prevCart, { ...product, quantity }];
        });
      }
      return true;
    } catch (err) {
      setError("Failed to add item to cart");
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (user) {
        const response = await API.delete(`/cart/remove/${productId}`);
        setCart(response.data.items);
      } else {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
      }
    } catch (err) {
      setError("Failed to remove item from cart");
      throw err;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      if (user) {
        const response = await API.put("/cart/update", {
          productId,
          quantity,
        });
        setCart(response.data.items);
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (err) {
      setError("Failed to update quantity");
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await API.delete("/cart/clear");
      }
      setCart([]);
      localStorage.removeItem("cart");
    } catch (err) {
      setError("Failed to clear cart");
      throw err;
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};