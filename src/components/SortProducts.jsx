import React, { useEffect, useRef, useState } from "react";
import "./styles/sortItems_style.css";
import { Filter, FunnelFill, SortDown, SortDownAlt} from "react-bootstrap-icons";
import { Slider } from "@mui/material";

const SortProducts = ({ setMinPrice, setMaxPrice, setSortType }) => {

  const [rangebar, setRangebar] = useState(false);

  const [currentIcon, setCurrnetIcon] = useState(0);

  const [sortActive, setSortActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  // --------------------------------------------------------
  const [value, setValue] = React.useState([500, 1500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (filterActive) {
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
    }
  };

  // ------------------------------------------
  const rangeBarRef = useRef(null);
  const rangeBarbuttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        rangeBarRef.current &&
        !rangeBarRef.current.contains(event.target) &&
        rangeBarbuttonRef.current &&
        !rangeBarbuttonRef.current.contains(event.target)
      ) {
        // console.log("activated");
        setRangebar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ----------------------------------------------
  const icons = [
    <Filter size={22} />,
    <SortDownAlt size={22} />,
    <SortDown size={22} />,
  ];

  function switchIcons() {
    let newcurrentIcon = (currentIcon + 1) % icons.length;
    setCurrnetIcon(newcurrentIcon);
    if (newcurrentIcon !== 0) {
      setSortActive(true);
      if (newcurrentIcon === 1) {
        setSortType("asce");
      } else {
        setSortType("desc");
      }
    } else {
      setSortActive(false);
      setSortType("");
    }
    // displayIcon = icons[currentIcon];
    // console.log("clicked")
    // console.log(currentIcon)
  }

  // console.log(filterActive)

  return (
    <div className="sort-main">
      <div className="sort-items">
        <div className="sort-items-text">
          <div
            className={`sort-items-text-1 ${sortActive ? "active" : ""}`}
            onClick={switchIcons}
          >
            Sort by Price
            {icons[currentIcon]}
            {/* <Filter size={22} /> */}
            {/* <SortDown size={22}/> */}
          </div>
          <div
            className={`sort-items-text-2 ${filterActive ? "active" : ""}`}
            ref={rangeBarbuttonRef}
          >
            <FunnelFill size={22} onClick={() => setRangebar(!rangebar)} />
          </div>
        </div>
        {rangebar && (
          <div className="sort-popup" ref={rangeBarRef}>
            <div className="range-values">
              <span>${value[0]}</span>
              <span>${value[1]}</span>
            </div>
            <div className="range-filter">
              <input
                type="checkbox"
                name="filterOn"
                id="filterOn"
                checked={filterActive}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilterActive(e.target.checked);
                    setMinPrice(value[0]);
                    setMaxPrice(value[1]);
                  } else {
                    setFilterActive(e.target.checked);
                    setMinPrice(null);
                    setMaxPrice(null);
                  }
                }}
              />
              <div className="range-slider">
                <Slider
                  // getAriaLabel={() => "Price range"}
                  value={value}
                  onChange={handleChange}
                  // valueLabelDisplay="auto"
                  // getAriaValueText={valuetext}
                  min={10}
                  max={2000}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortProducts;
