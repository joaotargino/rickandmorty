import axios from "axios";
import { Character } from "../data/interface";

const BASE_URL = "https://rickandmortyapi.com/api/character";

function assertIsCharacter(character: any): asserts character is Character {
  if (!("name" in character)) {
    throw new Error("Not character");
  }
}

export const fetchCharacters = async (name: string, page: number) => {
  const pagination = page ? `page=${page}` : "";
  const filter = name ? `name=${name}&${pagination}` : "";

  const query = name != "" ? filter : pagination; //pages != "" ? pages : "";
  const url = `${BASE_URL}${query ? `?${query}` : ''}`;
  console.log(url);
  const response = await fetch(url);
  return response.json();
};
