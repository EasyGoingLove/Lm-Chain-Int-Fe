import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useFavoriteCocktails from "../hooks/useFavoriteCocktails";
import { getFullCocktailDetailsById } from "../api/cocktailApi";
import CocktailCard from "../components/CocktailCard";
import { Cocktail } from "../types/common";
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

const FavoritesApi: React.FC = () => {
  const { favorites, removeFavorite } = useFavoriteCocktails("favorites");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCocktails = async () => {
      setLoading(true);
      setError(null);

      try {
        const cocktailPromises = favorites.map((id) =>
          getFullCocktailDetailsById(id)
        );
        const cocktailsData = await Promise.all(cocktailPromises);
        const validCocktails = cocktailsData
          .filter((data) => data !== null)
          .flat();
        setCocktails(validCocktails);
      } catch (err) {
        setError("😢 Failed to fetch favorite cocktails.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteCocktails();
    } else {
      setCocktails([]);
      setLoading(false);
    }
  }, [favorites]);

  return (
    <FavoritesContainer>
      <StyledH1>🍹 Favorite Cocktails</StyledH1>

      {loading && <Loader />}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && cocktails.length > 0 ? (
        <FavoritesList>
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              drinkId={cocktail.idDrink}
              title={cocktail.strDrink}
              imgSrc={cocktail.strDrinkThumb}
              category={cocktail.strCategory}
              glass={cocktail.strGlass}
              infoTxt={cocktail.strInstructions}
              isFavorite
              onToggleFavorite={(cocktailId) => removeFavorite(cocktailId)}
            />
          ))}
        </FavoritesList>
      ) : (
        !loading &&
        !error && (
          <NoFavoritesMessage>
            {favorites.length > 0 ? (
              <>
                Woah, partner! You were going too fast. 😅 <br />
                Slow down, drink some warm water, and return in 10 seconds!
              </>
            ) : (
              <>
                😔 No favorite cocktails yet! <br /> Start adding some delicious
                drinks! 🚰
              </>
            )}
          </NoFavoritesMessage>
        )
      )}
    </FavoritesContainer>
  );
};

export default FavoritesApi;
