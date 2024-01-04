import React, { useContext, useEffect, useRef, useState } from "react";
import { Navbar } from "react-bootstrap";
import {
  CaretUpFill,
  CartCheck,
  CartDash,
  Search,
} from "react-bootstrap-icons";

import "./styles/navtab_style.css";
import { loginContext } from "./Context";
import CartItems from "./CartItems";
import SearchSuggestionbox from "./SearchSuggestionbox";
import SmallScreenSuggestBox from "./SmallScreenSuggestBox";

const NavTab = ({ userName, img }) => {
  const { searchInput, setSearchInput, addCart } = useContext(loginContext);

  const [suggestBox, setSuggestBox] = useState(false);
  const [smSearchActivate, setSmSearchActivate] = useState(false);
  const [cartItems, setCartItems] = useState(false);

  const [totalItems, setTotalItems] = useState(0);

  // ------------------------------------------
  const lgsearchBarRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        lgsearchBarRef.current &&
        !lgsearchBarRef.current.contains(event.target) 
      ) {
        // console.log("activated");
        setSuggestBox(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ----------------------------------------------

  useEffect(() => {
    let count = 0;
    for (const key in addCart) {
      if (addCart.hasOwnProperty(key)) {
        count += addCart[key];
      }
    }
    setTotalItems(count);
  }, [addCart]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="bg-primary"
      style={{ height: "70px" }}
    >
      <div className="d-flex justify-content-between align-items-center mainNav">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <span>
            <img src={img} alt="profile Img" className="profile-Img" />
          </span>
          Hello {userName}
        </Navbar.Brand>
        <div className="search-bar">
          <span className="search-icon">
            <Search size={22} />
          </span>
          <input
            type="text"
            name="text"
            id="text_input"
            value={searchInput}
            ref={lgsearchBarRef}
            placeholder= "Search for Products"
            onChange={(e) => setSearchInput(e.target.value.trim())}
            onFocus={() => setSuggestBox(true)}
            // onBlur={() => setSuggestBox(false)}
          />
          {suggestBox && (
            <SearchSuggestionbox
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSuggestBox={setSuggestBox}
              setSmSearchActivate={setSmSearchActivate}
            />
          )}
        </div>
        <Search
          size={25}
          className="sm-search-bar-icon"
          onClick={() => {
            setSmSearchActivate(true);
            setSearchInput("");
          }}
        />
        <div className="bag">
          {totalItems ? (
            <CartCheck
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => setCartItems(!cartItems)}
            />
          ) : (
            <CartDash
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => setCartItems(!cartItems)}
            />
          )}
          <div className="dot">{totalItems}</div>
          {cartItems && totalItems ? (
            <>
              <div className="Up-pointer">
                <CaretUpFill size={35} color="white" />
              </div>
              <div className="cart-items-popup">
                <CartItems addCart={addCart} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* --------------------------------------------------------- */}
      {(smSearchActivate || suggestBox) && (
        <SmallScreenSuggestBox
          setSmSearchActivate={setSmSearchActivate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSuggestBox={setSuggestBox}
          suggestBox={suggestBox}
          searchBarRef={searchBarRef}
        />
      )}
    </Navbar>
  );
};

export default NavTab;
