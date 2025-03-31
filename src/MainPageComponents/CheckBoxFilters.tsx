import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

interface CheckboxFiltersProps {
  onFilterChange: (filters: CheckboxFiltersState) => void;
  theme: string;
}

interface CheckboxFiltersState {
  manufacturers: string[];
  types: string[];
  colors: string[];
  fuels: string[];
  massOptions: string[];
  yearOptions: string[];
}

const CheckboxFilters: React.FC<CheckboxFiltersProps> = ({ onFilterChange, theme }) => {
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
    <div className={`checkbox-filters ${theme}`}>
      <button
        className="btn btn-primary custom-btn w-100 mb-2"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      <Collapse in={open}>
        <div className="filter-dropdown">
          <div className="filter-group mb-2">
            <h6>Manufacturer</h6>
            <div className="d-flex flex-wrap gap-2">
              {manufacturers.map((manufacturer) => (
                <div key={manufacturer} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input custom-checkbox"
                    id={`manufacturer-${manufacturer}`}
                    checked={filters.manufacturers.includes(manufacturer)}
                    onChange={() => handleCheckboxChange("manufacturers", manufacturer)}
                  />
                  <label className="form-check-label" htmlFor={`manufacturer-${manufacturer}`}>
                    {manufacturer}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group mb-2">
            <h6>Type</h6>
            <div className="d-flex flex-wrap gap-2">
              {types.map((type) => (
                <div key={type} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input custom-checkbox"
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onChange={() => handleCheckboxChange("types", type)}
                  />
                  <label className="form-check-label" htmlFor={`type-${type}`}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group mb-2">
            <h6>Color</h6>
            <div className="d-flex flex-wrap gap-2">
              {colors.map((color) => (
                <div key={color} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input custom-checkbox"
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onChange={() => handleCheckboxChange("colors", color)}
                  />
                  <label className="form-check-label" htmlFor={`color-${color}`}>
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group mb-2">
            <h6>Fuel</h6>
            <div className="d-flex flex-wrap gap-2">
              {fuels.map((fuel) => (
                <div key={fuel} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input custom-checkbox"
                    id={`fuel-${fuel}`}
                    checked={filters.fuels.includes(fuel)}
                    onChange={() => handleCheckboxChange("fuels", fuel)}
                  />
                  <label className="form-check-label" htmlFor={`fuel-${fuel}`}>
                    {fuel}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group mb-2">
            <h6>Mass</h6>
            <div className="d-flex flex-wrap gap-2">
              {massOptions.map((mass) => (
                <div key={mass} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input custom-checkbox"
                    id={`mass-${mass}`}
                    checked={filters.massOptions.includes(mass)}
                    onChange={() => handleCheckboxChange("massOptions", mass)}
                  />
                  <label className="form-check-label" htmlFor={`mass-${mass}`}>
                    {mass}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group mb-2">
            <h6>Year</h6>
            <div className="d-flex flex-wrap gap-2">
              {yearOptions.map((year) => (
                <div key={year} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input custom-checkbox"
                    id={`year-${year}`}
                    checked={filters.yearOptions.includes(year)}
                    onChange={() => handleCheckboxChange("yearOptions", year)}
                  />
                  <label className="form-check-label" htmlFor={`year-${year}`}>
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default CheckboxFilters;