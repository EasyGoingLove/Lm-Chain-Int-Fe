import { Cocktail } from "../types/common";

export const generateRandomCocktailIds = ({
  count,
  minId,
  maxId,
}: {
  count: number;
  minId: number;
  maxId: number;
}): number[] => {
  const ids = new Set<number>();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    ids.add(randomId);
  }

  return Array.from(ids);
};

export const getRandomKnownCoctails = ({ n }: { n: number }): string[] => {
  const knownCoctailIds: string[] = [
    "17141", "12776", "11000", "17205", "17253", "11872", "17255", "12704", "11023", "17217", "11728",
    "17176", "11690", "12093", "11600", "11008", "15941", "12097", "17178", "12856", "13501", "13332",
    "15853", "17187", "17254", "17241", "11149", "17835", "15933", "17210", "13222", "17195", "17831",
    "11060", "14195", "15409", "11120", "17105", "17249", "17837", "11124", "17209", "12572", "14378",
    "16178",
  ];

  const arrayCopy = [...knownCoctailIds];

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, n);
};

export const hashCocktailData = async (cocktail: Cocktail): Promise<string> => {
  const cocktailString = `${cocktail.idDrink}${cocktail.strDrink}${cocktail.strCategory}${cocktail.strGlass}${cocktail.strInstructions}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(cocktailString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};


export const getRandomNumbers = (n: number, max: number): number[] => 
   {
  const numbers = new Set<number>();
  while (numbers.size < Math.min(n, max)) {
      numbers.add(Math.floor(Math.random() * max) + 1);
  }
  
  return Array.from(numbers);
}