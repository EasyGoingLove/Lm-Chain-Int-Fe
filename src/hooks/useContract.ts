import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";

import { getRandomNumbers } from "../utils/functions";
import useFavorites from "./useFavoriteCocktails";
import ABI from "../utils/abi.json";

const CONTRACT_ADDRESS = "0xe9f1B66369b06588589226848a97738beaB283E5";

export const useContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );
        setContract(contractInstance);
      } else {
        console.error("Ethereum provider is not available");
      }
    };

    initContract();
  }, []);

  return contract;
};

export const useCocktailContract = () => {
  const contract = useContract();
  const { favorites } = useFavorites("favorites-blockchain");
  const [cocktails, setCocktails] = useState<any[]>([]); 
  const [favoriteCocktails, sefavoriteCocktails] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCocktails = async () => {
      if (!contract) return null;

      setLoading(true);
      setError(null);

      try {
        const chosenCoctailsToDisplay = 10;
        const countObj = await contract.getCockltailCount();
        const count = BigNumber.from(countObj._hex).toNumber();
        const cocktailsArray: any[] = [];

        const randomCoctailIds = getRandomNumbers(
          chosenCoctailsToDisplay,
          count
        );

        for (let i = 0; i < chosenCoctailsToDisplay; i++) {
          const cocktail = await contract.getCocktail(randomCoctailIds[i]);

          if (cocktail)
            console.log(cocktail);
            
            cocktailsArray.push({
              drinkId: randomCoctailIds[i],
              title: cocktail.name,
              imgSrc: cocktail.imageUrl,
              category: cocktail.category,
              alcoholPercentage: cocktail.alcoholPercentage,
              cocktailType: cocktail.cocktailType,
              price: BigNumber.from(cocktail.price).toNumber(),
              averageRating: BigNumber.from(cocktail._averageRating._hex).toNumber(),
            });
        }

        setCocktails(cocktailsArray);
      } catch (error) {
        console.log(error);

        setError(
          "An error occurred. Please try again. Also please check if you metamask is connected to the 'Sepolia' network !"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllCocktails();
  }, [contract]);

  useEffect(() => {
    const getFavoriteCoctails = async () => {
      if (!contract) return null;

      const cocktailsArray: any[] = [];

      for (let i = 0; i < favorites.length; i++) {
        const cocktail = await contract.getCocktail(Number(favorites[i]));

        if (cocktail)
          cocktailsArray.push({
            drinkId: favorites[i],
            title: cocktail.name,
            imgSrc: cocktail.imageUrl,
            category: cocktail.category,
            alcoholPercentage: cocktail.alcoholPercentage,
            cocktailType: cocktail.cocktailType,
            price: Number(cocktail.price),
            averageRating: Number(cocktail.averageRating),
          });
      }
      sefavoriteCocktails(cocktailsArray);
    };

    getFavoriteCoctails();
  }, [contract, favorites]);

  // // Add a cocktail
  const addCocktail = async (cocktailData: any) => {
    if (!contract) {
      setError("Contract not available.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const tx = await contract.addCocktail(
        cocktailData.name,
        cocktailData.imageUrl,
        cocktailData.category,
        cocktailData.alcoholPercentage,
        cocktailData.cocktailType,
        cocktailData.price
      );
      await tx.wait();

    } catch (error:any) {
      setError(`Error addint coctail : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // // Rate a cocktail
  const rateCocktail = async (id: number, rating: number) => {
    if (!contract) {
      setError("Contract not available.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const tx = await contract.rateCocktail(id, rating);
      await tx.wait();

    } catch (error:any) {
      setError(`Error addint coctail : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    cocktails,
    loading,
    error,
    favoriteCocktails,
    addCocktail,
    rateCocktail,
  };
};
