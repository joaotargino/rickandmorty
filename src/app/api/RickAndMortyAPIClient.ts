import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (name: string, page: number) => {
  const pagination = page ? `page=${page}` : "";
  const filter = name ? `name=${name}&${pagination}` : "";

  const query = name != "" ? filter : pagination;
  const url = `${BASE_URL}${query ? `?${query}` : ""}`;
  const response = await axios.get(url);

  if (response.status === 404) {
    return response.data.error.message;
  } else if (response.status === 200) {
    return response.data;
  }

  return response;
};

export const fetchCharactersByListOfIDs = async (ids: string) => {
  const url = `${BASE_URL}/${ids}`;
  const response = await axios.get(url);
  return response.data;
};
