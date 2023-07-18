"use client";

import { CharactersPage } from "./Presentation/CharactersPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Router> */}
      <ThemeProvider theme={theme}>
        <CharactersPage />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
      {/* </Router> */}
    </QueryClientProvider>
  );
}
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
