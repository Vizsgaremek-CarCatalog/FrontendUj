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

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);  // For showing details under the image
  const [selectedCarsForComparison, setSelectedCarsForComparison] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Car | "">("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [horsePowerRange, setHorsePowerRange] = useState<[number, number]>([0, 1000]);
  const [filters, setFilters] = useState({ type: "", color: "", fuel: "", manufacturer: "" });

  const handleCarClick = (carId: number) => {
    setSelectedCar(selectedCar === carId ? null : carId);  // Toggle the car details display
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

  const handleFilterChange = (filter: keyof typeof filters, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  const handleComparisonClick = (car: Car) => {
    if (selectedCarsForComparison.length < 2) {
      setSelectedCarsForComparison((prev) => [...prev, car]);
    }
  };

  const closeComparisonModal = () => {
    setSelectedCarsForComparison([]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-white">Car Comparison App</h1>
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

      {/* Price Range Filter */}
      <div className="mb-3">
        <h5 className="text-white">Price Range: ${priceRange[0]} - ${priceRange[1]}</h5>
        <Slider
          range
          min={0}
          max={100000}
          defaultValue={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
        />
      </div>

      {/* Horse Power Range Filter */}
      <div className="mb-3">
        <h5 className="text-white">Horse Power Range: {horsePowerRange[0]} - {horsePowerRange[1]} HP</h5>
        <Slider
          range
          min={0}
          max={1000}
          defaultValue={horsePowerRange}
          onChange={(value) => setHorsePowerRange(value as [number, number])}
        />
      </div>

      {/* Car List */}
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {filteredCars.map((car) => (
          <div key={car.id} className="col">
            <div className="card shadow-sm border-0 rounded-3">
              <img
                src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
                className="car-img"
                alt={car.vehicle}
                onClick={() => handleCarClick(car.id)}  // Toggle car details display
              />
              <div className="card-body text-center">
                <h5
                  className="card-title fw-bold text-primary"
                  onClick={() => handleCarClick(car.id)}  // Toggle car details display
                  style={{ cursor: "pointer" }}
                >
                  {car.vehicle}
                </h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleComparisonClick(car)}
                  disabled={selectedCarsForComparison.length >= 2}
                >
                  Compare
                </button>
              </div>

              {/* Car Details (showing below the image when selected) */}
              {selectedCar === car.id && (
                <div className="card-body">
                         <p><strong>Manufacturer:</strong> {car.manufacturer}</p>
                        <p><strong>Type:</strong> {car.type}</p>
                        <p><strong>Price:</strong> ${car.price}</p>
                        <p><strong>Horse Power:</strong> {car.horsePower}</p>
                        <p><strong>Year:</strong> {car.color}</p>
                        <p><strong>Fuel:</strong> {car.fuel}</p>
                        <p><strong>Mass:</strong> {car.mass}</p>
                        <p><strong>Year:</strong> {car.yearMade}</p>
                        <p><strong>Description:</strong> {car.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Modal */}
      {selectedCarsForComparison.length === 2 && (
        <div className="modal fade show d-block" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Compare Cars</h5>
                <button type="button" className="btn-close" onClick={closeComparisonModal}></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-between">
                  {selectedCarsForComparison.map((car, index) => (
                    <div key={car.id} className="card" style={{ width: '45%' }}>
                      <img
                        src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
                        className="card-img-top"
                        alt={car.vehicle}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{car.vehicle}</h5>
                        <p><strong>Manufacturer:</strong> {car.manufacturer}</p>
                        <p><strong>Type:</strong> {car.type}</p>
                        <p><strong>Price:</strong> ${car.price}</p>
                        <p><strong>Horse Power:</strong> {car.horsePower}</p>
                        <p><strong>Year:</strong> {car.color}</p>
                        <p><strong>Fuel:</strong> {car.fuel}</p>
                        <p><strong>Mass:</strong> {car.mass}</p>
                        <p><strong>Year:</strong> {car.yearMade}</p>
                        <p><strong>Description:</strong> {car.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeComparisonModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
