import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Stack } from "@mui/material";
import AppBar from "./components/AppBar";
import MainContent from "./components/MainContent";
import { Provider } from "react-redux";
import { Store } from "./store";
import Theme from "./utils/Theme";
import "./App.scss";
import Footer from "./components/Footer";

/**
 * This is the root element of the application. The layout is made up of three sections: The Appbar, the search box and the Main content.
 * The AppProvider provides the app with global states.
 */
function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Stack id="app">
          <AppBar />
          <MainContent />
          <Footer />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
