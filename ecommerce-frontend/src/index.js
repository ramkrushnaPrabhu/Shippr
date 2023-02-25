import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import ShipprContext from "./Context/ShipprContext";
import { Provider } from "react-redux";
import { store } from "./Store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShipprContext>
    <ChakraProvider>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </ChakraProvider>
  </ShipprContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
