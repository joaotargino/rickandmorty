import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  getByRole,
  waitFor,
  act,
} from "@testing-library/react";
import { CharactersPage } from "../app/ui/pages/CharactersPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import UserEvent from "@testing-library/user-event";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Roboto Mono, monospace",
    },
    h2: {
      fontFamily: "Roboto Mono, monospace",
    },
    h3: {
      fontFamily: "Roboto Mono, monospace",
    },
    h4: {
      fontFamily: "Roboto Mono, monospace",
    },
    h5: {
      fontFamily: "Roboto Mono, monospace",
    },
    h6: {
      fontFamily: "Roboto Mono, monospace",
    },
  },
});

describe("<<CharactersPage />", () => {
  it("should render the actual card by default", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CharactersPage />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(screen.getAllByTestId(/filter-section/));
  });

  test("should hide the filter's section", async () => {
    const { container } = render(
      // container is `Element` here
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CharactersPage />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // render(<CharactersPage />); // render Character page

    expect(screen.getAllByTestId(/filter-section/)); // check if the filter id is to be rendered
    // fireEvent.click(screen.getByTestId(/filter-section/)); // trigger click event on the element

    // fireEvent.change(getByTestId(container, "select"), {
    //   target: { value: "50" },
    // });

    // act(async () => {
    /* fire events that update state */
    // UserEvent.click(getByRole(screen.getByTestId("select"), "button"));
    // const select = screen.getByTestId("select");
    // UserEvent.click(select);
    // const select50 = screen.getByTestId("select-option-50");
    // UserEvent.click(select50);

    const dropdownButton = screen.getByTestId("select");
    UserEvent.click(dropdownButton);

    // const dropdownItem = await screen.findByRole("button", { name: /50/i });
    const dropdownItem = await screen.findByText(/20/i);
    UserEvent.click(dropdownItem);

    // expect(screen.getAllByTestId(/filter-section/)).toBeInTheDocument();
    // expect(screen.getAllByTestId(/filter-section/)).not.toBeInTheDocument();
    // });

    // expect(screen.getByText("50")).toBeInTheDocument();

    // await waitFor(() => UserEvent.click(screen.getByText(/50/i)));
    // expect(screen.getByRole("heading")).toHaveTextContent(/50/i);

    // When the selected display option per 50 is active, the filter section should be hidden

    // Mock useState before rendering your component
    // expect(screen.getAllByTestId(/filter-section/)).not.toBeInTheDocument();
  });
});
