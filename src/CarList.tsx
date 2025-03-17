import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";

interface Car {
  id: number;
  vehicle: string;
  type: string;
  manufacturer: string;
  color: string;
  fuel: string;
  imageUrl?: string; // Optional property for the image
}

interface CarListProps {
  theme: "green-white" | "dark-light"; // Assuming two theme options
}

const CarList: React.FC<CarListProps> = ({ theme }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null); // Track selected car by ID

  useEffect(() => {
    axios.get("http://localhost:3000/carcatalog")
      .then((response) => setCars(response.data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again.");
      });
  }, []);

  // Determine the theme class
  const themeClass = theme === "green-white" ? "bg-light" : "bg-dark text-white";

  // Handle car selection (clicking on image or name)
  const handleCarClick = (id: number) => {
    if (selectedCar === id) {
      setSelectedCar(null); // If the car is already selected, deselect it
    } else {
      setSelectedCar(id); // Select the car to show details
    }
  };

  return (
    <div className={`container mt-5 ${themeClass}`}>
      <h1 className="text-center mb-4">Car Catalog</h1>

      {error && <p className="text-danger text-center">{error}</p>}

      {cars.length > 0 ? (
        <div className="row">
          {cars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"} // Placeholder image
                  className="card-img-top"
                  alt={car.vehicle}
                  onClick={() => handleCarClick(car.id)} // Click to show/hide details
                  style={{ cursor: "pointer" }}
                />
                <div className="card-body">
                  <h5 className="card-title" onClick={() => handleCarClick(car.id)} style={{ cursor: "pointer" }}>
                    {car.vehicle}
                  </h5>

                  {/* Show car details if this car is selected */}
                  {selectedCar === car.id && (
                    <div>
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
        <p className="text-center">No cars found.</p>
      )}
    </div>
  );
};

export default CarList;
