import React, { useState, useEffect } from "react";
import { Car } from "./types";
import CarDetails from "./CarDetails";
import { BASE_URL } from "../config";

interface CarCardProps {
  car: Car;
  selectedCar: number | null;
  setSelectedCar: (value: number | null) => void;
  setSelectedCarsForComparison: React.Dispatch<React.SetStateAction<Car[]>>;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
  isLoggedIn: boolean;
  resetComparison: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  selectedCar,
  setSelectedCar,
  setSelectedCarsForComparison,
  carComments,
  setCarComments,
  isLoggedIn,
  resetComparison,
}) => {
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    if (resetComparison) {
      setIsCompared(false); // Reset the button state to blue
    }
  }, [resetComparison]);

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCarsForComparison((prev) => {
      if (isCompared) {
        // Remove the car from the comparison list and toggle back to blue
        setIsCompared(false);
        return prev.filter((selectedCar) => selectedCar.id !== car.id);
      } else if (prev.length < 2) {
        // Add the car to the comparison list and toggle to green
        setIsCompared(true);
        return [...prev, car];
      }
      return prev;
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-full">
      <div
        className={`cursor-pointer w-full p-4 ${
          selectedCar === car.id ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
      >
        <div className="relative w-full h-64">
          <img
            src={
              car.imageUrl
                ? car.imageUrl.startsWith('http')
                  ? car.imageUrl
                  : BASE_URL + car.imageUrl
                : "/placeholder.png" // Default to local placeholder
            }
            alt={car.vehicle}
            className="w-full h-full object-contain rounded-lg shadow-md"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + "/placeholder.png") {
                console.warn(`Failed to load image: ${target.src}`);
                target.src = "/placeholder.png"; // Local fallback
              }
            }}
          />
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-500">
            {car.vehicle}
          </h1>
          <table className="table-auto w-full text-left border-collapse">
            <tbody>
              <tr>
                <th className="py-2 px-2 font-medium text-gray-700 bg-gray-100">
                  Price
                </th>
                <td className="py-2 px-2">${car.price.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleComparisonClick}
            className={`mt-4 px-4 py-2 rounded-lg transition-colors duration-200 ${
              isCompared
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Compare
          </button>
        </div>
      </div>

      {selectedCar === car.id && (
        <div className="p-4 bg-gray-50">
          <CarDetails
            car={car}
            carComments={carComments}
            setCarComments={setCarComments}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  );
};

export default CarCard;