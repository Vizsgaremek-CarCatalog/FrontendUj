import React, { useState } from "react";
import { Car } from "./types";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: Car;
  selectedCar: number | null;
  setSelectedCar: (value: number | null) => void;
  setSelectedCarsForComparison: React.Dispatch<React.SetStateAction<Car[]>>;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  selectedCar,
  setSelectedCar,
  setSelectedCarsForComparison,
  carComments,
  setCarComments,
}) => {
  const handleComparisonClick = () => {
    setSelectedCarsForComparison((prev) => prev.length < 2 ? [...prev, car] : prev);
  };

  return (
    <div className="col">
      <div className="card shadow-sm border-0 rounded-3">
        <img
          src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
          className="car-img"
          alt={car.vehicle}
          onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
        />
        <div className="card-body text-center">
          <h5
            className="card-title fw-bold text-primary"
            onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
            style={{ cursor: "pointer" }}
          >
            {car.vehicle}
          </h5>
          <button
            className="btn btn-primary"
            onClick={handleComparisonClick}
          >
            Compare
          </button>
        </div>
        {selectedCar === car.id && (
          <CarDetails
            car={car}
            carComments={carComments}
            setCarComments={setCarComments}
          />
        )}
      </div>
    </div>
  );
};

export default CarCard;