import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "@mui/material/Slider";
import { removeBrandCategory, removeSubCategory } from "../../redux/actions/fetch_action";
import { addBrandCategory, addSubCategory, priceFilter } from "../../redux/actions/fetch_action";
import { Filters, SubCategoryFilter, BrandFilter, PriceFilter, Faucets, Shower, Sink, Tiles, Cera, Dsons, Hindware, Jaguar } from "../../assets/constants/constant";
import "../../assets/css/filter_side_bar.css";

const FilterSideBar = () => {

  const [range, setRange] = useState<[number, number]>([100, 10000]);
  const dispatch = useDispatch();


  const handleChanges = (event:Event, newValue: number | number[], activeThumb: number) => {
   
    if (Array.isArray(newValue)) {
      setRange(newValue as [number, number]);
    } else {
      const newRange = [...range];
      newRange[activeThumb] = newValue;
      setRange(newRange as [number, number]);
    }

    dispatch(priceFilter(range[0], range[1]));
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, className } = e.target;
     if (className === "clink") {
        checked ?  dispatch(addSubCategory(name)) : dispatch(removeSubCategory(name));
       
      } else if (className === "blink") {
        checked ? dispatch(addBrandCategory(name)) : dispatch(removeBrandCategory(name));
      }
    
  };

  return (
    <React.Fragment>
      <div className="side-container">
      <h4>{Filters}</h4>
      <div className="sidebar">
       
        <div className="filter-type">
          <li className="side-parent">{SubCategoryFilter}</li>
          <hr />

          <li className="side-child2">
            <input
              type="checkbox"
              className="clink"
              name="Faucets"
              onChange={handleChecked}
            ></input>
            <label>{Faucets}</label>
          </li>

          <li className="side-child2">
            <input
              type="checkbox"
              className="clink"
              name="Sink"
              onChange={handleChecked}
            ></input>
            <label>{Sink}</label>
          </li>

          <li className="side-child2">
            <input
              type="checkbox"
              className="clink"
              name="Tiles"
              onChange={handleChecked}
            ></input>
            <label>{Tiles}</label>
          </li>

          <li className="side-child2">
            <input
              type="checkbox"
              className="clink"
              name="Shower"
              onChange={handleChecked}
            ></input>
            <label>{Shower}</label>
          </li>
        </div>

        <div className="filter-type">
          <li className="side-parent">{PriceFilter}</li>
          <hr />
          <div style={{ width: "150px", padding: "20px" }}>
            <Slider
              value={range}
              max={10000}
              min={100}
              onChange={handleChanges}
              valueLabelDisplay="auto"
            />
            {range[0]} - {range[1]}
          </div>
        </div>

        <div className="filter-type">
          <li className="side-parent">{BrandFilter}</li>
          <hr />

          <li className="side-child1">
            <input
              type="checkbox"
              className="blink"
              name="D'sons"
              onChange={handleChecked}
            ></input>
            <label>{Dsons}</label>
          </li>

          <li className="side-child1">
            <input
              type="checkbox"
              className="blink"
              name="Jaguar"
              onChange={handleChecked}
            ></input>
            <label>{Jaguar}</label>
          </li>

          <li className="side-child1">
            <input
              type="checkbox"
              className="blink"
              name="Hindware"
              onChange={handleChecked}
            ></input>
            <label>{Hindware}</label>
          </li>

          <li className="side-child1">
            <input
              type="checkbox"
              className="blink"
              name="Cera"
              onChange={handleChecked}
            ></input>
            <label>{Cera}</label>
          </li>
          
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default FilterSideBar;
