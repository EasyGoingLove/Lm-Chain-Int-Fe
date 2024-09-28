import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useFavoriteCocktails from "../hooks/useFavoriteCocktails";
import { Cocktail, SearchOptionConfig } from "../types/common";
import { getRandomKnownCoctails } from "../utils/functions";
import RadioButtonGroup from "./RadioButtonGroup";
import CocktailCard from "./CocktailCard";
import Loader from "./Loader";
import {
  getFullCocktailDetailsById,
  getIngredientByName,
  getCocktailByName,
} from "../api/cocktailApi";

const CocktailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 100px;
`;

const HomeContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  font-size: 16px;
  transition: border 0.3s ease;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #e0aaff;
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #e0aaff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d18cda;
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  margin-left: 10px;
  border: 2px solid #e0aaff;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #d18cda;
    background-color: #f9f9f9;
  }

  &:focus {
    outline: none;
    border-color: #a75db8;
    background-color: #f0f0f0;
  }
`;

const StyledH2 = styled.h2`
  text-align: center;
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

const NoCocktailsMessage = styled(Message)`
  color: #555;
`;

type SearchOptionKey = keyof SearchOptionConfig;

const searchOptionConfig: SearchOptionConfig = {
  ingredient: {
    fetchFnc: getIngredientByName,
    inputPlaceHolder: "Search ingredient by name",
  },
  cocktail: {
    fetchFnc: getCocktailByName,
    inputPlaceHolder: "Search for a cocktail...",
  },
};

const HomeApi: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [originalCocktails, setOriginalCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<SearchOptionKey>("cocktail");

  const { favorites, addFavorite, removeFavorite } = useFavoriteCocktails("favorites");

  const handleSearchTypeChange = (selected: any) => {
    setSearchType(selected as SearchOptionKey);
    setSearchTerm("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (searchTerm.length >= 3) {
      setLoading(true);
      setError(null);

      try {
        const searchedCocktails: Cocktail[] = await searchOptionConfig[
          searchType
        ].fetchFnc(searchTerm);
        if (!searchedCocktails) {
          setError("No cocktails found");
        } else {
          console.log(searchedCocktails);

          const categories = Array.from(
            new Set(searchedCocktails.map((cocktail) => cocktail.strCategory))
          );

          setCocktails(searchedCocktails);
          setOriginalCocktails(searchedCocktails);
          setSelectedCategory("");
          setUniqueCategories(categories);
        }
      } catch (err) {
        setError("An error occurred while fetching cocktails.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSetSelectedCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    if (!originalCocktails) return;

    const filteredCocktails = selectedValue
      ? originalCocktails.filter(
        (cocktail) => cocktail.strCategory === selectedValue
      )
      : originalCocktails;

    setCocktails(filteredCocktails);
  };

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      setError(null);

      try {
        const randomIds = getRandomKnownCoctails({ n: 12 });
        const cocktailPromises = randomIds.map((id) =>
          getFullCocktailDetailsById(id)
        );

        const cocktailsData = await Promise.all(cocktailPromises);

        const validCocktails = cocktailsData
          .filter((data): data is Cocktail[] => data !== null)
          .flat()
          .filter((drink): drink is Cocktail => drink !== null);

        setCocktails(validCocktails);
        setOriginalCocktails(validCocktails);

        const categories = Array.from(
          new Set(validCocktails.map((cocktail) => cocktail.strCategory))
        );
        setUniqueCategories(categories);
      } catch (err) {
        setError("An error occurred while fetching random cocktails.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (searchType === "cocktail") {
      fetchCocktails();
    }
  }, [searchType]);


  return (
    <HomeContainer>
      <SearchForm onSubmit={handleSearchSubmit}>
        <RadioButtonGroup
          selected={searchType}
          onChange={handleSearchTypeChange}
        />

        <SearchInput
          type="text"
          placeholder={searchOptionConfig[searchType].inputPlaceHolder}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchButton type="submit">Search</SearchButton>

        {searchType === "cocktail" && (
          <StyledSelect
            value={selectedCategory}
            onChange={handleSetSelectedCategory}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </StyledSelect>
        )}
      </SearchForm>

      <StyledH2>🍸 Kickstart Your Cocktail Adventure 🍸</StyledH2>

      {loading && <Loader />}

      {error && <ErrorMessage>{error} 😢</ErrorMessage>}

      {!loading && !error && cocktails.length > 0 && (
        <CocktailList>
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              drinkId={cocktail.idDrink}
              title={cocktail.strDrink || cocktail.strIngredient}
              imgSrc={cocktail.strDrinkThumb || `https://www.thecocktaildb.com/images/ingredients/${cocktail.strIngredient}-Medium.png`}
              category={cocktail.strCategory}
              glass={cocktail.strGlass}
              infoTxt={cocktail.strInstructions || cocktail.strDescription}
              isFavorite={favorites.includes(cocktail.idDrink)}
              onToggleFavorite={(cocktailId) => {
                const isAlreadyFavorite = favorites.includes(cocktailId);
                if (isAlreadyFavorite) {
                  removeFavorite(cocktailId);
                } else {
                  addFavorite(cocktailId);
                }
              }}
            />
          ))}
        </CocktailList>
      )}

      {!loading && !error && cocktails.length === 0 && (
        <NoCocktailsMessage>
          🍹 No cocktails available. <br />
          Woah, partner! You were going too fast. 😅 <br />
          Slow down, drink some warm water, and return in 10 seconds!
        </NoCocktailsMessage>
      )}
    </HomeContainer>
  );
};

export default HomeApi;
