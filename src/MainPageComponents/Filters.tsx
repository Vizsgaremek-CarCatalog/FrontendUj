import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  horsePowerRange: [number, number];
  setHorsePowerRange: (value: [number, number]) => void;
  theme: string; // Add theme prop
}

const Filters: React.FC<FiltersProps> = ({
  priceRange,
  setPriceRange,
  horsePowerRange,
  setHorsePowerRange,
  theme,
}) => (
  <>
    <div className={`mb-3 filter-section ${theme}`}>
      <h5>Price Range: ${priceRange[0]} - ${priceRange[1]}</h5>
      <Slider
        range
        min={0}
        max={100000}
        defaultValue={priceRange}
        onChange={(value) => setPriceRange(value as [number, number])}
        trackStyle={{ backgroundColor: theme === "red-black" ? "#ff6b6b" : "#00ced1" }}
        handleStyle={{ borderColor: theme === "red-black" ? "#ff6b6b" : "#00ced1" }}
        railStyle={{ backgroundColor: theme === "red-black" ? "#3a3a3a" : "#f5faff" }}
      />
    </div>
    <div className={`mb-3 filter-section ${theme}`}>
      <h5>Horse Power Range: {horsePowerRange[0]} - {horsePowerRange[1]} HP</h5>
      <Slider
        range
        min={0}
        max={1000}
        defaultValue={horsePowerRange}
        onChange={(value) => setHorsePowerRange(value as [number, number])}
        trackStyle={{ backgroundColor: theme === "red-black" ? "#ff6b6b" : "#00ced1" }}
        handleStyle={{ borderColor: theme === "red-black" ? "#ff6b6b" : "#00ced1" }}
        railStyle={{ backgroundColor: theme === "red-black" ? "#3a3a3a" : "#f5faff" }}
      />
    </div>
  </>
);

export default Filters;