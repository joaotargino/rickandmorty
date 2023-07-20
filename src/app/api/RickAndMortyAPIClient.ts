const BASE_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (name: string, page: number) => {
  const pagination = page ? `page=${page}` : "";
  const filter = name ? `name=${name}&${pagination}` : "";

  const query = name != "" ? filter : pagination;
  const url = `${BASE_URL}${query ? `?${query}` : ""}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchCharactersByListOfIDs = async (ids: string) => {
  const url = `${BASE_URL}/${ids}`;
  const response = await fetch(url);
  console.log(ids, response);
  return response.json();
};
