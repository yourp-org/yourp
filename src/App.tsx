import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { GridPage } from "./GridPage";
import { LoginPage } from "./LoginPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [logged, setLogged] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {logged ? <GridPage /> : <LoginPage onSuccess={() => setLogged(true)} />}
    </ThemeProvider>
  );
};

export default App;
