import React from "react";
import ReactDOM from "react-dom/client";
import { extendTheme } from "@chakra-ui/react";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "./utils/Fonts";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

const test = () => {
  window.addEventListener("storage", ({ oldValue, newValue }) => {
    // Note: For this app we don't have any server to verify role/roles, in your case you can verify role/roles from your server and update accordingly.
    alert(
      `You can not change role/roles from ${oldValue} to ${newValue}, if you want to change role/roles please log out and then log in with a different roles.`
    );
    localStorage.setItem("roles", oldValue);
  });
};

// test();

// font-family: 'Heading Font Name';
//  font-family: 'Body Font Name';

const theme = extendTheme({
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Lato', sans-serif'`,
  },
  colors: {
    primary: "#F95700",
    secondary: "#0090C5",
    textPrimary: "#A1A9C3",
    borderPrimary: "#E7E7E7",
    bgLight: "#cef2ff",
    success: "#0BBF33",
    textSuccess: "#128300",
    error: "#E53E3E",
    warning: "",
    danger: "",
    hoverBg: "rgba(249, 87, 0, 0.1);",
    FormBackground: "#F1FBFE",
    placeholderLogin: "#777E89",
    checkboxfont: "#13152A",
    loginText: "#5E6282",
    Boxborder: "#DDE3E8",
  },
  fonts: {},
  fontSizes: {},
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Fonts />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
