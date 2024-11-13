import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import firebase from "./core/firebase";
import { theme } from "./core/theme";
import { Router } from "./routes/index";

const container = document.getElementById("root");
const root = createRoot(container!);

// Initialize Firebase first
firebase.initApp.then(() => {
  root.render(
    <StrictMode>
      <CssVarsProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Router />
        </SnackbarProvider>
      </CssVarsProvider>
    </StrictMode>,
  );
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
