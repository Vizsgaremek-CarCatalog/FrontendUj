import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  horsePowerRange: [number, number];
  setHorsePowerRange: (value: [number, number]) => void;
}

const Filters: React.FC<FiltersProps> = ({
  priceRange,
  setPriceRange,
  horsePowerRange,
  setHorsePowerRange,
}) => (
  <>
    <div>
      <h5>Price Range: ${priceRange[0]} - ${priceRange[1]}</h5>
      <Slider
        range
        min={0}
        max={100000}
        defaultValue={priceRange}
        onChange={(value) => setPriceRange(value as [number, number])}
      />
    </div>
    <div>
      <h5>Horse Power Range: {horsePowerRange[0]} - {horsePowerRange[1]} HP</h5>
      <Slider
        range
        min={0}
        max={1000}
        defaultValue={horsePowerRange}
        onChange={(value) => setHorsePowerRange(value as [number, number])}
      />
    </div>
  </>
);

export default Filters;