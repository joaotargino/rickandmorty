const BASE_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (name: string, page: number) => {
  const pagination = page ? `page=${page}` : "";
  const filter = name ? `name=${name}&${pagination}` : "";

  const query = name != "" ? filter : pagination;
  const url = `${BASE_URL}${query ? `?${query}` : ''}`;
  console.log(url);
  const response = await fetch(url);
  return response.json();
};
