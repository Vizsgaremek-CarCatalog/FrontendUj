import React, { useState } from "react";

interface CheckboxFiltersProps {
  onFilterChange: (filters: CheckboxFiltersState) => void;
}

interface CheckboxFiltersState {
  manufacturers: string[];
  types: string[];
  colors: string[];
  fuels: string[];
  massOptions: string[];
  yearOptions: string[];
}

const CheckboxFilters: React.FC<CheckboxFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<CheckboxFiltersState>({
    manufacturers: [],
    types: [],
    colors: [],
    fuels: [],
    massOptions: [],
    yearOptions: [],
  });
  const [open, setOpen] = useState(false);

  const manufacturers = ["Toyota", "Ford", "BMW", "Mercedes", "Honda"];
  const types = ["Coupe", "Sedan", "SUV", "Truck", "Hatchback"];
  const colors = ["Red", "Blue", "Black", "White", "Silver"];
  const fuels = ["Gasoline", "Diesel", "Electric", "Hybrid"];
  const massOptions = ["<1000 kg", "1000-2000 kg", "2000-3000 kg", ">3000 kg"];
  const yearOptions = ["<2000", "2000-2010", "2010-2020", ">2020"];

  const handleCheckboxChange = (category: keyof CheckboxFiltersState, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const newFilters = { ...prev, [category]: updatedValues };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      {open && (
        <div>
          <div>
            <h6>Manufacturer</h6>
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer}>
                <input
                  type="checkbox"
                  id={`manufacturer-${manufacturer}`}
                  checked={filters.manufacturers.includes(manufacturer)}
                  onChange={() => handleCheckboxChange("manufacturers", manufacturer)}
                />
                <label htmlFor={`manufacturer-${manufacturer}`}>
                  {manufacturer}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h6>Type</h6>
            {types.map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={filters.types.includes(type)}
                  onChange={() => handleCheckboxChange("types", type)}
                />
                <label htmlFor={`type-${type}`}>
                  {type}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h6>Color</h6>
            {colors.map((color) => (
              <div key={color}>
                <input
                  type="checkbox"
                  id={`color-${color}`}
                  checked={filters.colors.includes(color)}
                  onChange={() => handleCheckboxChange("colors", color)}
                />
                <label htmlFor={`color-${color}`}>
                  {color}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h6>Fuel</h6>
            {fuels.map((fuel) => (
              <div key={fuel}>
                <input
                  type="checkbox"
                  id={`fuel-${fuel}`}
                  checked={filters.fuels.includes(fuel)}
                  onChange={() => handleCheckboxChange("fuels", fuel)}
                />
                <label htmlFor={`fuel-${fuel}`}>
                  {fuel}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h6>Mass</h6>
            {massOptions.map((mass) => (
              <div key={mass}>
                <input
                  type="checkbox"
                  id={`mass-${mass}`}
                  checked={filters.massOptions.includes(mass)}
                  onChange={() => handleCheckboxChange("massOptions", mass)}
                />
                <label htmlFor={`mass-${mass}`}>
                  {mass}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h6>Year</h6>
            {yearOptions.map((year) => (
              <div key={year}>
                <input
                  type="checkbox"
                  id={`year-${year}`}
                  checked={filters.yearOptions.includes(year)}
                  onChange={() => handleCheckboxChange("yearOptions", year)}
                />
                <label htmlFor={`year-${year}`}>
                  {year}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxFilters;