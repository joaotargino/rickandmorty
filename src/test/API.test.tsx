import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Character } from "../app/data/model/interface";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import Home from "../app/page";

const characters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "unknown", url: "" },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    url: "https://rickandmortyapi.com/api/character/2",
    created: "2017-11-04T18:50:21.651Z",
  },
  {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    url: "https://rickandmortyapi.com/api/character/3",
    created: "2017-11-04T19:09:56.428Z",
  },
];

const BASE_URL = "https://rickandmortyapi.com/api/character";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

const renderComponent = () => render(<Home />);

describe("<CharactersPage />", () => {
  // var axios = require("axios");

  // This sets the mock adapter on the default instance
  const MockAdapter = require("axios-mock-adapter");
  // var mock = new MockAdapter(axios);
  const mock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" });

  beforeEach(() => {
    mock.resetHandlers();
  });

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  it("renders users when API call succeeds", async () => {
    // Mock GET request to /users when param `searchText` is 'John'
    // arguments for reply are (status, data, headers)
    mock.onGet("/character").reply(200, characters);

    const { queryByText, getAllByTestId } = renderComponent();

    expect(queryByText(/Traflorkian/i)).not.toBeInTheDocument();
    expect(queryByText(/Rick Sanchez/i)).not.toBeInTheDocument();
    expect(queryByText(/Morty Smith/i)).not.toBeInTheDocument();

    //Grid was loaded with the response
    await waitFor(() => getAllByTestId("characters-grid"));
    //show the grid, expected to be 3 characters
    expect(queryByText(/Morty Smith/i)).toBeInTheDocument();
    expect(queryByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(queryByText(/Summer Smith/i)).toBeInTheDocument();
    expect(queryByText(/Aqua Morty/i)).not.toBeInTheDocument();
    expect(queryByText(/Traflorkian/i)).not.toBeInTheDocument();

    axiosInstance
      .get("/character", { params: { searchText: "Aqua" } })
      .then(function (response: { data: any }) {
        console.log(response.data);
      });
  });

  it("renders error when API call fails", async () => {
    // Returns a failed promise with Error('Network Error');
    mock.onGet("/character").networkError();

    // networkErrorOnce can be used to mock a network error only once
    mock.onGet("/character").networkErrorOnce();
  });
});
