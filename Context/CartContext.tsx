import { createContext, useContext, useState } from "react";

type CartContextType = {
  refreshCart: boolean;
  triggerRefreshCart: () => void;
};

const CartContext = createContext<CartContextType>({
  refreshCart: false,
  triggerRefreshCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshCart, setRefreshCart] = useState(false);

  const triggerRefreshCart = () => {
    setRefreshCart((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ refreshCart, triggerRefreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
