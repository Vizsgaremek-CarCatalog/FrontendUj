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
  <div className="p-6 m-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div className="mb-6">
      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
      </h5>
      <div className="px-2">
        <Slider
          range
          min={0}
          max={10000000}
          defaultValue={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
          trackStyle={{ backgroundColor: '#3b82f6', height: 6 }}
          handleStyle={{
            borderColor: '#3b82f6',
            height: 16,
            width: 16,
            marginTop: -5,
            backgroundColor: '#ffffff',
          }}
          railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
        />
      </div>
    </div>
    <div>
      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Horsepower Range: {horsePowerRange[0]} - {horsePowerRange[1]} HP
      </h5>
      <div className="px-2">
        <Slider
          range
          min={0}
          max={1500}
          defaultValue={horsePowerRange}
          onChange={(value) => setHorsePowerRange(value as [number, number])}
          trackStyle={{ backgroundColor: '#3b82f6', height: 6 }}
          handleStyle={{
            borderColor: '#3b82f6',
            height: 16,
            width: 16,
            marginTop: -5,
            backgroundColor: '#ffffff',
          }}
          railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
        />
      </div>
    </div>
  </div>
);

export default Filters;