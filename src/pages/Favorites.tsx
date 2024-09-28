import React from "react";
import { useAccount } from "wagmi";

import { useMode } from "../context/ModeContext";
import FavoritesApi from "../components/FavoritesApi";
import FavoritesBlockchain from "../components/FavoritesBlockchain";
import LockedScreen from "../components/LockedScreen";

const Favorites: React.FC = () => {
  const { isConnected } = useAccount();
  const { mode } = useMode();

  if (!isConnected && mode === "blockchain") {
    return <LockedScreen />;
  }

  return (
    <>
      {mode === "api" && <FavoritesApi />}
      {mode === "blockchain" && <FavoritesBlockchain />}
    </>
  );
};

export default Favorites;
