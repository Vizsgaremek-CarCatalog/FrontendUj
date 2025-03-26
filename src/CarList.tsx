import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";

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
  theme: "green-white" | "dark-light" | "blue-gray"; // Added new theme option
}

const CarList: React.FC<CarListProps> = ({ theme }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/carcatalog")
      .then((response) => setCars(response.data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again.");
      });
  }, []);

  // Determine the theme class
  const themeClass = theme === "green-white" ? "bg-light" 
    : theme === "dark-light" ? "bg-dark text-white" 
    : "bg-blue-gray text-dark";

  return (
    <div className={`container mt-5 ${themeClass}`}>
      <h1 className="text-center mb-4">Car Catalog</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {cars.length > 0 ? (
        <div className="row">
          {cars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 rounded-3">
                <img
                  src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
                  className="card-img-top"
                  alt={car.vehicle}
                  onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
                  style={{ cursor: "pointer", transition: "0.3s", borderRadius: "10px" }}
                />
                <div className="card-body text-center">
                  <h5 
                    className="card-title fw-bold text-primary" 
                    onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {car.vehicle}
                  </h5>
                  {selectedCar === car.id && (
                    <div className="text-muted">
                      <p><strong>Type:</strong> {car.type}</p>
                      <p><strong>Manufacturer:</strong> {car.manufacturer}</p>
                      <p><strong>Color:</strong> {car.color}</p>
                      <p><strong>Fuel:</strong> {car.fuel}</p>
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