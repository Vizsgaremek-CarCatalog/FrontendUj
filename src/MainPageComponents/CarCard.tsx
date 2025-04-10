import React from "react";
import { Car } from "./types";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: Car;
  selectedCar: number | null;
  setSelectedCar: (value: number | null) => void;
  setSelectedCarsForComparison: React.Dispatch<React.SetStateAction<Car[]>>;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
  isLoggedIn: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  selectedCar,
  setSelectedCar,
  setSelectedCarsForComparison,
  carComments,
  setCarComments,
  isLoggedIn,
}) => {
  const handleComparisonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCarsForComparison((prev) => (prev.length < 2 ? [...prev, car] : prev));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-full">
      <div
        className={`cursor-pointer w-full p-4 ${selectedCar === car.id ? "border-2 border-blue-500" : ""}`}
        onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
      >
        <div className="relative w-full h-64"> {/* Increased height to h-64 */}
          <img
            src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
            alt={car.vehicle}
            className="w-full h-full object-contain rounded-lg shadow-md" // object-contain to avoid cropping
          />
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-500">
            {car.vehicle}
          </h1>
          <table className="table-auto w-full text-left border-collapse">
            <tbody>
              <tr>
                <th className="py-2 px-2 font-medium text-gray-700 bg-gray-100">Price</th>
                <td className="py-2 px-2">${car.price.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleComparisonClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
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