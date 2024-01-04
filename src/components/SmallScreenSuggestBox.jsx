import React from "react";
import { ArrowLeftSquareFill, Search } from "react-bootstrap-icons";
import SearchSuggestionbox from "./SearchSuggestionbox";
import './styles/smallScreenSearch_style.css';

const SmallScreenSuggestBox = ({
  setSmSearchActivate,
  searchInput,
  setSearchInput,
  setSuggestBox,
  suggestBox,
  searchBarRef,
}) => {
  return (
    <div className="sm-search-page">
      <div className="sm-search-menu">
        <ArrowLeftSquareFill
          size={45}
          color="white"
          onClick={() => {
            setSmSearchActivate(false);
            setSearchInput("");
          }}
        />
        <div className="sm-search-bar">
          <span className="search-icon">
            <Search size={22} />
          </span>
          <input
            type="text"
            name="text"
            id="text_input"
            value={searchInput}
            placeholder= "Search for Products"
            ref={searchBarRef}
            onChange={(e) => setSearchInput(e.target.value.trim())}
            onFocus={() => setSuggestBox(true)}
            // onBlur={() => setSuggestBox(false)}
          />
        </div>
        {suggestBox && (
          <SearchSuggestionbox
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setSuggestBox={setSuggestBox}
            setSmSearchActivate={setSmSearchActivate}
          />
        )}
      </div>
    </div>
  );
};

export default SmallScreenSuggestBox;
