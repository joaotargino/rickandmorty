import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import { render } from './test-utils';
import { Character } from "../app/data/model/interface";
import { CharacterCard } from "../app/presentation/components/CharacterCard";

const character: Character = {
  id: 361,
  name: "Toxic Rick",
  status: "Dead",
  species: "Humanoid",
  type: "Rick's Toxic Side",
  gender: "Male",
  origin: {
    name: "Alien Spa",
    url: "https://rickandmortyapi.com/api/location/64",
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/27"],
  url: "https://rickandmortyapi.com/api/character/361",
  created: "2018-01-10T18:20:41.703Z",
};

describe("<CharacterCard character={character} />", () => {
  it("should render the actual card by default", () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByText(/Open card/)).toBeInTheDocument();
  });

  it("should render OPEN when clicked", () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];

    render(<CharacterCard character={character} />); // render Character card

    expect(screen.getByText(/Open card/)).toBeInTheDocument(); // check if the Open string to be rendered
    fireEvent.click(screen.getByText(/Open card/)); // trigger click event on the element

    // When the Open card button is clicked, a Modal Popup is rendered
    // and the state isOpen === true
    // check for state change

    
    // Mock useState before rendering your component
    jest.spyOn(React, "useState").mockImplementationOnce(useStateMock);
    expect(setStateMock).toHaveBeenCalledWith("Currently open");
  });
});
