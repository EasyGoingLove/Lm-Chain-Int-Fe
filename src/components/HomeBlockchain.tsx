import React, { useState } from "react";
import styled from "styled-components";

import useFavoriteCocktails from "../hooks/useFavoriteCocktails";
import { useCocktailContract } from "../hooks/useContract";
import CocktailCard from "./CocktailCard";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
`;

const CocktailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 100px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const HomeBlockchain: React.FC = () => {
  const { cocktails, loading, error, addCocktail, rateCocktail } = useCocktailContract();
  const { favorites, addFavorite, removeFavorite } = useFavoriteCocktails(
    "favorites-blockchain"
  );

  const [newCocktail, setNewCocktail] = useState({
    name: "",
    imageUrl: "",
    category: "",
    alcoholPercentage: 0,
    cocktailType: "",
    price: 0,
  });
  const [rateData, setRateData] = useState<any>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleAddCocktail = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCocktail(newCocktail)) {
      addCocktail(newCocktail);
      setNewCocktail({
        name: "",
        imageUrl: "",
        category: "",
        alcoholPercentage: 0,
        cocktailType: "",
        price: 0,
      });
      setIsModalOpen(false);
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const validateCocktail = (cocktailData: typeof newCocktail) => {
    return Object.values(cocktailData).every(
      (value) => value !== "" && value !== 0
    );
  };

  const hanldeRateCoctail = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCocktail(rateData)) {
      rateCocktail(rateData.id, rateData.rateValue);
      setRateData({});
      setIsRateModalOpen(false);
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const reset = () => {
    navigate("/");
  };
  console.log(cocktails);

  return (
    <HomeContainer>
      {loading && <Loader />}

      {error && (
        <ErrorMessage>
          {error} 😢{" "}
          <button type="button" onClick={reset}>
            Refresh
          </button>
        </ErrorMessage>
      )}

      {!loading && !error && (
        <Button onClick={() => setIsModalOpen(true)}>Add New Cocktail</Button>
      )}

      {/* Modal for Adding Cocktail */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>Add a New Cocktail</ModalHeader>
            <Form onSubmit={handleAddCocktail}>
              <Input
                name="name"
                placeholder="Cocktail Name"
                value={newCocktail.name}
                onChange={(e) =>
                  setNewCocktail({ ...newCocktail, name: e.target.value })
                }
              />
              <Input
                name="imageUrl"
                placeholder="Image URL"
                value={newCocktail.imageUrl}
                onChange={(e) =>
                  setNewCocktail({ ...newCocktail, imageUrl: e.target.value })
                }
              />
              <Input
                name="category"
                placeholder="Category"
                value={newCocktail.category}
                onChange={(e) =>
                  setNewCocktail({ ...newCocktail, category: e.target.value })
                }
              />
              <Input
                name="alcoholPercentage"
                type="number"
                placeholder="Alcohol Percentage"
                value={newCocktail.alcoholPercentage}
                onChange={(e) =>
                  setNewCocktail({
                    ...newCocktail,
                    alcoholPercentage: Number(e.target.value),
                  })
                }
              />
              <Input
                name="cocktailType"
                placeholder="Cocktail Type"
                value={newCocktail.cocktailType}
                onChange={(e) =>
                  setNewCocktail({
                    ...newCocktail,
                    cocktailType: e.target.value,
                  })
                }
              />
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={newCocktail.price}
                onChange={(e) =>
                  setNewCocktail({
                    ...newCocktail,
                    price: Number(e.target.value),
                  })
                }
              />
              <ModalButton type="submit">Add Cocktail</ModalButton>
              <ModalButton type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </ModalButton>
            </Form>
          </ModalContainer>
        </ModalOverlay>
      )}

      {isRateModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>Add a New Cocktail</ModalHeader>
            <Form onSubmit={hanldeRateCoctail}>
              <Input
                name="rate"
                type="number"
                placeholder="Rate"
                value={rateData.rateValue}
                max={5}
                min={1}
                onChange={(e) =>
                  setRateData({
                    ...rateData,
                    rateValue: Number(e.target.value),
                  })
                }
              />
              <ModalButton type="submit">Rate Cocktail</ModalButton>
              <ModalButton type="button" onClick={() => setIsRateModalOpen(false)}>
                Cancel
              </ModalButton>
            </Form>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* List of Cocktails */}
      {!loading && !error && cocktails.length > 0 && (
        <CocktailList>
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.drinkId}
              drinkId={cocktail.drinkId}
              title={cocktail.title}
              imgSrc={cocktail.imgSrc}
              category={cocktail.category}
              averageRating={cocktail.averageRating}
              isFavorite={favorites.includes(cocktail.drinkId)}
              rateCoctail={() => {
                setIsRateModalOpen(true);
                setRateData({ ...rateData, id: cocktail.drinkId });
              }}
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
    </HomeContainer>
  );
};

export default HomeBlockchain;
