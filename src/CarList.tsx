import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

interface Car {
  id: number;
  vehicle: string;
  type: string;
  color: string;
  fuel: string;
  manufacturer: string;
  mass: number;
  imageUrl?: string;
  price: number;
  description: string;
  yearMade: number;
  horsePower: number;
}

interface CarListProps {
  theme: "green-white" | "dark-light" | "blue-gray";
}

const CarList: React.FC<CarListProps> = ({ theme }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Car | "">("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [horsePowerRange, setHorsePowerRange] = useState<[number, number]>([0, 1000]);
  const [filters, setFilters] = useState({ type: "", color: "", fuel: "", manufacturer: "" });

  const handleCarClick = (carId: number) => {
    setSelectedCar(selectedCar === carId ? null : carId);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/carcatalog")
      .then((response) => {
        setCars(response.data);
        setFilteredCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again.");
      });
  }, []);

  useEffect(() => {
    let updatedCars = cars.filter((car) =>
      car.vehicle.toLowerCase().includes(search.toLowerCase()) &&
      car.price >= priceRange[0] && car.price <= priceRange[1] &&
      car.horsePower >= horsePowerRange[0] && car.horsePower <= horsePowerRange[1] &&
      (filters.type ? car.type === filters.type : true) &&
      (filters.color ? car.color === filters.color : true) &&
      (filters.fuel ? car.fuel === filters.fuel : true) &&
      (filters.manufacturer ? car.manufacturer === filters.manufacturer : true)
    );

    if (sortKey) {
      updatedCars.sort((a, b) =>
        sortOrder === "asc" ? (a[sortKey] > b[sortKey] ? 1 : -1) : (a[sortKey] < b[sortKey] ? 1 : -1)
      );
    }

    setFilteredCars(updatedCars);
  }, [search, sortKey, sortOrder, priceRange, horsePowerRange, filters, cars]);

  const themeClass =
    theme === "green-white"
      ? "bg-light"
      : theme === "dark-light"
      ? "bg-dark text-white"
      : "bg-blue-gray text-dark";

  const handleFilterChange = (filter: keyof typeof filters, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  return (
    <div className={`container mt-5 ${themeClass}`}>
      <h1 className="text-center mb-4 text-white">A alkalmazás neve</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Search and Sort */}
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by vehicle name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as keyof Car)}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="yearMade">Year Made</option>
          <option value="horsePower">Horse Power</option>
          <option value="vehicle">Name</option>
        </select>
        <button className="btn btn-secondary" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-3 text-white">
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <Slider
          range
          min={0}
          max={10000000}
          step={1000}
          value={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
        />
      </div>

      {/* Horse Power Range */}
      <div className="mb-3 text-white">
        <label>Horse Power Range: {horsePowerRange[0]} - {horsePowerRange[1]}</label>
        <Slider
          range
          min={0}
          max={1500}
          step={10}
          value={horsePowerRange}
          onChange={(value) => setHorsePowerRange(value as [number, number])}
        />
      </div>

      {/* Filters */}
      <div className="mb-3">
        <select
          className="form-select"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">Filter by Type</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>
      </div>

      {/* Other filters */}
      <div className="mb-3">
        <select
          className="form-select"
          value={filters.color}
          onChange={(e) => handleFilterChange("color", e.target.value)}
        >
          <option value="">Filter by Color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
      </div>

      {/* Other filters */}
      <div className="mb-3">
        <select
          className="form-select"
          value={filters.fuel}
          onChange={(e) => handleFilterChange("fuel", e.target.value)}
        >
          <option value="">Filter by Fuel</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* Other filters */}
      <div className="mb-3">
        <select
          className="form-select"
          value={filters.manufacturer}
          onChange={(e) => handleFilterChange("manufacturer", e.target.value)}
        >
          <option value="">Filter by Manufacturer</option>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="BMW">BMW</option>
        </select>
      </div>

      {/* Car List */}
      {filteredCars.length > 0 ? (
        <div className="row">
          {filteredCars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 rounded-3">
                <img
                  src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
                  className="car-img"
                  alt={car.vehicle}
                  onClick={() => handleCarClick(car.id)}
                />
                <div className="card-body text-center">
                  <h5
                    className="card-title fw-bold text-primary"
                    onClick={() => handleCarClick(car.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {car.vehicle}
                  </h5>
                  {selectedCar === car.id && (
                    <div className="text-muted">
                      <p><strong>Manufacturer:</strong> {car.manufacturer}</p>
                      <p><strong>Type:</strong> {car.type}</p>
                      <p><strong>Color:</strong> {car.color}</p>
                      <p><strong>Fuel:</strong> {car.fuel}</p>
                      <p><strong>Mass:</strong> {car.mass} Kg</p>
                      <p><strong>Year Made:</strong> {car.yearMade}</p>
                      <p><strong>Horse Power:</strong> {car.horsePower}</p>
                      <p><strong>Description:</strong> {car.description}</p>
                      <p><strong>Price:</strong> ${car.price}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary">No cars found.</p>
      )}
    </div>
  );
};

export default CarList;
