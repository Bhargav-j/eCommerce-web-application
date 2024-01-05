import { createContext, useState } from "react";

const loginContext = createContext();
const productsContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [islogin, setISLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [auth, setAuth] = useState(null);
  const [img, setImg] = useState(null);

  return (
    <loginContext.Provider
      value={{
        // -----------------------
        islogin,
        setISLogin,
        userName,
        setUserName,
        auth,
        setAuth,
        img,
        setImg,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

const ProductsContextProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState({});

  return (
    <productsContext.Provider
      value={{
        products,
        setProducts,
        searchInput,
        setSearchInput,
        // -------------------------
        addCart,
        setAddCart,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export {
  LoginContextProvider,
  loginContext,
  productsContext,
  ProductsContextProvider,
};
