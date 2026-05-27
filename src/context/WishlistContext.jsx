import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");

    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // SAVE
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ADD
  const addToWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);

    if (existingProduct) {
      return false;
    }

    setWishlist([...wishlist, product]);

    return true;
  };

  // REMOVE
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
