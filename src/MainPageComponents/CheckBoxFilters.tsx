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

  const manufacturers = [
    "Toyota", "Ford", "BMW", "Mercedes", "Honda",
    "Jeep", "Porsche", "Audi", "Dodge", "Land Rover",
    "Genesis", "Hyundai", "Lucid Motors", "Maserati",
    "Volvo", "Kia", "Mercedes-Benz", "Chevrolet",
    "Tesla", "Rivian", "Lotus", "Polestar", "Lamborghini",
    "Ferrari", "Nissan", "Aston Martin", "Handmade"
  ];
  
  const types = [
    "Coupe", "Sedan", "SUV", "Truck", "Hatchback",
    "Sports", "Chevrolet Corvette C6"
  ];
  
  const colors = [
    "Red", "Blue", "Black", "White", "Silver",
    "Green", "Orange", "Yellow", "Gray", "Rosso Corsa",
    "Dark Green"
  ];
  
  const fuels = [
    "Gasoline", "Diesel", "Electric", "Hybrid",
    "Kachow"
  ];
  
  const massOptions = [
    "<1000 kg", "1000-2000 kg", "2001-3000 kg", ">3000 kg"
  ];
  
  const yearOptions = [
    "<2000", "1999-2011", "2010-2020", ">2020", 
  ];

  const handleCheckboxChange = (category: keyof CheckboxFiltersState, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const newFilters = { ...prev, [category]: updatedValues };
      onFilterChange(newFilters); // Notify parent of filter change
      return newFilters;
    });
  };

  return (
    <div className="p-6 m-4 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-4"
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manufacturer */}
          <div>
            <h6 className="text-lg font-semibold text-gray-800 mb-3">Manufacturer</h6>
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`manufacturer-${manufacturer}`}
                  checked={filters.manufacturers.includes(manufacturer)}
                  onChange={() => handleCheckboxChange("manufacturers", manufacturer)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label
                  htmlFor={`manufacturer-${manufacturer}`}
                  className="ml-2 text-gray-700"
                >
                  {manufacturer}
                </label>
              </div>
            ))}
          </div>

          {/* Type */}
          <div>
            <h6 className="text-lg font-semibold text-gray-800 mb-3">Type</h6>
            {types.map((type) => (
              <div key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={filters.types.includes(type)}
                  onChange={() => handleCheckboxChange("types", type)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor={`type-${type}`} className="ml-2 text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>

          {/* Color */}
          <div>
            <h6 className="text-lg font-semibold text-gray-800 mb-3">Color</h6>
            {colors.map((color) => (
              <div key={color} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`color-${color}`}
                  checked={filters.colors.includes(color)}
                  onChange={() => handleCheckboxChange("colors", color)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor={`color-${color}`} className="ml-2 text-gray-700">
                  {color}
                </label>
              </div>
            ))}
          </div>

          {/* Fuel */}
          <div>
            <h6 className="text-lg font-semibold text-gray-800 mb-3">Fuel</h6>
            {fuels.map((fuel) => (
              <div key={fuel} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`fuel-${fuel}`}
                  checked={filters.fuels.includes(fuel)}
                  onChange={() => handleCheckboxChange("fuels", fuel)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor={`fuel-${fuel}`} className="ml-2 text-gray-700">
                  {fuel}
                </label>
              </div>
            ))}
          </div>

          {/* Mass */}
          <div>
            <h6 className="text-lg font-semibold text-gray-800 mb-3">Mass</h6>
            {massOptions.map((mass) => (
              <div key={mass} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`mass-${mass}`}
                  checked={filters.massOptions.includes(mass)}
                  onChange={() => handleCheckboxChange("massOptions", mass)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor={`mass-${mass}`} className="ml-2 text-gray-700">
                  {mass}
                </label>
              </div>
            ))}
          </div>

          {/* Year */}
          <div>
            <h6 className="text-lg font-semibold text-gray-800 mb-3">Year</h6>
            {yearOptions.map((year) => (
              <div key={year} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`year-${year}`}
                  checked={filters.yearOptions.includes(year)}
                  onChange={() => handleCheckboxChange("yearOptions", year)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor={`year-${year}`} className="ml-2 text-gray-700">
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