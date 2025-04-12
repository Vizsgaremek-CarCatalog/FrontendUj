import React from "react";
import { Car } from "./types";
import { BASE_URL } from "../config";

interface ComparisonModalProps {
  selectedCars: Car[];
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ selectedCars, onClose }) => {
  if (selectedCars.length !== 2) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 animate-float-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h5 className="text-xl font-bold text-gray-800">Compare Cars</h5>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="flex-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
              >
                <img
                  src={
                    car.imageUrl
                      ? car.imageUrl.startsWith("http")
                        ? car.imageUrl
                        : BASE_URL + car.imageUrl
                      : "/placeholder.jpg" // Local placeholder
                  }
                  alt={car.vehicle}
                  className="w-full h-48 object-scale-down rounded-t-lg shadow-xl" // Fixed height
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + "/placeholder.jpg") {
                      console.warn(`Failed to load image: ${target.src}`);
                      target.src = "/placeholder.jpg";
                    }
                  }}
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">{car.manufacturer} - {car.vehicle}</h5>
                    <table className="table-auto w-full text-left border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Type</th>
                          <td className="py-2 px-4">{car.type}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Price</th>
                          <td className="py-2 px-4">${car.price.toLocaleString()}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Horsepower</th>
                          <td className="py-2 px-4">{car.horsePower} HP</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Fuel</th>
                          <td className="py-2 px-4">{car.fuel}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Mass</th>
                          <td className="py-2 px-4">{car.mass} kg</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Year</th>
                          <td className="py-2 px-4">{car.yearMade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;