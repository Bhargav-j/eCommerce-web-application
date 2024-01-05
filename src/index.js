import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginContextProvider, ProductsContextProvider } from "./components/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
