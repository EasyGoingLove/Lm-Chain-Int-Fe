import { useState, useEffect } from 'react';

const useFavorites = (storageKey: string) => {
  const [favorites, setFavorites] = useState<string[]>([]); 

  useEffect(() => {
    const savedFavorites = localStorage.getItem(storageKey);
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites)); 
    }
  }, [storageKey]);

  const addFavorite = (itemId: string) => {
    if (!favorites.includes(itemId)) {
      const updatedFavorites = [...favorites, itemId]; 
      setFavorites(updatedFavorites);
      localStorage.setItem(storageKey, JSON.stringify(updatedFavorites)); 
    }
  };

  const removeFavorite = (itemId: string) => {
    const updatedFavorites = favorites.filter(id => id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites)); 
  };

  return { favorites, addFavorite, removeFavorite };
};

export default useFavorites;
