import React, { useContext} from "react";
import "./styles/searchSuggest_style.css";
import { loginContext } from "./Context";
import { ListGroup } from "react-bootstrap";

const SearchSuggestionbox = ({
  searchInput,
  setSearchInput,
  setSuggestBox,
  setSmSearchActivate
}) => {
  const { products } = useContext(loginContext);

  return (
    <div className="search_suggest">
      <ListGroup className="search_suggest-list">
        {products.map((product) => {
          if (
            product["title"].toLowerCase().startsWith(searchInput.toLowerCase())
          ) {
            return (
              <ListGroup.Item
                key={product["id"]}
                onClick={() => {
                  setSuggestBox(false);
                  setSearchInput(product["title"]);
                  setSmSearchActivate(false)
                }}
              >
                <div className="each-item-div">
                  <div className="each-item-img">
                    <img src={product["images"][0]} alt="Img" />
                  </div>
                  <div>{product["title"]}</div>
                </div>
              </ListGroup.Item>
            );
          } else {
            return "";
          }
        })}
      </ListGroup>
    </div>
  );
};

export default SearchSuggestionbox;
