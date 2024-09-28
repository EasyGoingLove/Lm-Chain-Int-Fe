export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strGlass: string;
  strInstructions: string;
  strIngredient:string;
  strType:string;
  strDescription:string;
}

export interface RadioButtonGroupProps {
  selected: string;
  onChange: (value: string) => void;
}

interface SearchOptionApi {
  fetchFnc: (searchTerm: string) => Promise<any>;
  inputPlaceHolder: string;
}

// interface SearchOptionAbi {
//   fetchFnc: () => { cocktails: any[]; loading: boolean; error: string | null; };
//   inputPlaceHolder: string;
// }

export interface SearchOptionConfig {
  ingredient: SearchOptionApi;
  cocktail: SearchOptionApi;
  // blockchain: SearchOptionAbi;
}
