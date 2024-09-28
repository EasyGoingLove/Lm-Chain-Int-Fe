import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";

import useFavoriteCocktails from "../hooks/useFavoriteCocktails";
import { useCocktailContract } from "../hooks/useContract";
import CocktailCard from "../components/CocktailCard";
import LockedScreen from "../components/LockedScreen";
import Loader from "../components/Loader";

const FavoritesContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 100px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
`;

const ErrorMessage = styled(Message)`
  color: red;
`;

const NoFavoritesMessage = styled(Message)`
  color: #555;
`;

const StyledH1 = styled.h1`
  text-align: center;
`;

const FavoritesBlockchain: React.FC = () => {
  const { removeFavorite } = useFavoriteCocktails("favorites-blockchain");
  const { favoriteCocktails, loading, error } = useCocktailContract();
  const { isConnected } = useAccount();

  const [updatedCocktails, setUpdatedCocktails] = useState(favoriteCocktails);

  useEffect(() => {
    setUpdatedCocktails(favoriteCocktails);
  }, [favoriteCocktails]);

  const handleToggleFavorite = (cocktailId: string) => {
    removeFavorite(cocktailId);
    setUpdatedCocktails((prev) => prev.filter((cocktail: any) => cocktail.drinkId !== cocktailId));
  };

  if (!isConnected) {
    return <LockedScreen />;
  }

  return (
    <FavoritesContainer>
      <StyledH1>🍹 Favorite Cocktails</StyledH1>

      {loading && <Loader />}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && updatedCocktails && updatedCocktails.length > 0 ? (
        <FavoritesList>
          {updatedCocktails.map((cocktail: any) => (
            <CocktailCard
              key={cocktail.drinkId}
              drinkId={cocktail.drinkId}
              title={cocktail.title}
              imgSrc={cocktail.imgSrc}
              category={cocktail.category}
              isFavorite
              onToggleFavorite={() => handleToggleFavorite(cocktail.drinkId)}
            />
          ))}
        </FavoritesList>
      ) : (
        !loading &&
        !error && (
          <NoFavoritesMessage>
            <>
              😔 No favorite cocktails yet! <br /> Start adding some delicious
              drinks! 🚰
            </>
          </NoFavoritesMessage>
        )
      )}
    </FavoritesContainer>
  );
};

export default FavoritesBlockchain;
