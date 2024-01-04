import { createContext, useState } from "react";

const loginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [islogin, setISLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [auth, setAuth] = useState(null);
  const [img, setImg] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState({});

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
        // ------------------------
        products,
        setProducts,
        searchInput,
        setSearchInput,
        // -------------------------
        addCart,
        setAddCart
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export { LoginContextProvider, loginContext };
