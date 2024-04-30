import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { RecoilRoot } from "recoil";
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "#0b0b0b")(props),
    },
  }),
};

const colors = {
  gray: {
    light: "#5c5a5a",
    dark: "#232221",
  },
};
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config, colors, styles });
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);
