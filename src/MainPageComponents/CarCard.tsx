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
  isAdmin?: boolean; // New prop for admin mode
  onDeleteCar?: () => void; // New prop for deleting car
  onToggleComments?: () => void; // New prop for toggling comments
  commentCount?: number; // New prop for comment count
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
  isAdmin = false,
  onDeleteCar,
  onToggleComments,
  commentCount = 0,
}) => {
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    if (resetComparison) {
      setIsCompared(false);
    }
  }, [resetComparison]);

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCarsForComparison((prev) => {
      if (isCompared) {
        setIsCompared(false);
        return prev.filter((selectedCar) => selectedCar.id !== car.id);
      } else if (prev.length < 2) {
        setIsCompared(true);
        return [...prev, car];
      }
      return prev;
    });
  };

  const handleCardClick = () => {
    if (!isAdmin) {
      setSelectedCar(selectedCar === car.id ? null : car.id);
    }
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-full">
        <div
          className={`cursor-pointer w-full p-4 ${selectedCar === car.id && !isAdmin ? "border-2 border-blue-500" : ""}`}
          onClick={handleCardClick}
        >
          <div className="relative w-full h-64">
            <img
              src={
                car.imageUrl
                  ? car.imageUrl.startsWith("http")
                    ? car.imageUrl
                    : BASE_URL + car.imageUrl
                  : "/placeholder.png"
              }
              alt={car.vehicle}
              className="w-full h-full object-contain rounded-lg shadow-md"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== window.location.origin + "/placeholder.png") {
                  console.warn(`Failed to load image: ${target.src}`);
                  target.src = "/placeholder.png";
                }
              }}
            />
          </div>
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-500">{car.vehicle}</h1>
            <table className="table-auto w-full text-left border-collapse">
              <tbody>
                <tr>
                  <th className="py-2 px-2 font-medium text-gray-700 bg-gray-100">Price</th>
                  <td className="py-2 px-2">${car.price.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            {isAdmin ? (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCar?.();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Car
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComments?.();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Comments ({commentCount})
                </button>
              </div>
            ) : (
              <button
                onClick={handleComparisonClick}
                className={`mt-4 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isCompared ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Compare
              </button>
            )}
          </div>
        </div>
      </div>

      {!isAdmin && selectedCar === car.id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 animate-float-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h5 className="text-xl font-bold text-gray-800">{car.vehicle} Details</h5>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-1/2">
                <img
                  src={
                    car.imageUrl
                      ? car.imageUrl.startsWith("http")
                        ? car.imageUrl
                        : BASE_URL + car.imageUrl
                      : "/placeholder.png"
                  }
                  alt={car.vehicle}
                  className="w-full h-48 object-cover rounded-lg shadow-md md:h-64"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + "/placeholder.png") {
                      console.warn(`Failed to load image: ${target.src}`);
                      target.src = "/placeholder.png";
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <CarDetails
                  car={car}
                  carComments={carComments}
                  setCarComments={setCarComments}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCard;