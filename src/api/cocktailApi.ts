import axios from 'axios';

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries: number = 2, backoff: number = 5000): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`Retrying... (${i + 1}/${retries})`);
        await delay(backoff); 
      } else {
        console.error('Max retries reached. Error:', error);
        return null; 
      }
    }
  }
  return null; 
};


export const getCocktailByName = async (name: string): Promise<any> => {
  const url = `${API_URL}search.php?s=${name}`;
  const data = await fetchWithRetry(url);
  return data ? data.drinks || null : null;
};

export const getIngredientByName = async (name: string): Promise<any> => {
  const url = `${API_URL}search.php?i=${name}`;
  const data = await fetchWithRetry(url);
  return data ? data.ingredients || null : null;
};


export const getFullCocktailDetailsById = async (id: string): Promise<any> => {
  const url = `${API_URL}lookup.php?i=${id}`;
  const data = await fetchWithRetry(url);
  return data ? data.drinks || null : null;
};


export const getPopularCocktail = async (): Promise<any> => {
  const url = `${API_URL}popular.php`;
  const data = await fetchWithRetry(url);
  return data ? data.drinks || null : null;
};


export const getRandomCocktail = async (): Promise<any> => {
  const url = `${API_URL}random.php`;
  const data = await fetchWithRetry(url);
  return data ? data.drinks[0] || null : null;
};


export const getCocktailsByCategory = async (category: string): Promise<any> => {
  const url = `${API_URL}filter.php?c=${category}`;
  const data = await fetchWithRetry(url);
  return data ? data.drinks || null : null;
};
