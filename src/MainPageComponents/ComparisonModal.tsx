import React from "react";
import { Car } from "./types";

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
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h5 className="text-xl font-bold text-gray-800">Compare Cars</h5>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {selectedCars.map((car) => (
              <div 
                key={car.id} 
                className="flex-1 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
                  alt={car.vehicle}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800 mb-4">{car.vehicle}</h5>
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
                        <td className="py-2 px-4">{car.mass}</td>
                      </tr>

                      <tr className="border-b">
                        <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Year</th>
                        <td className="py-2 px-4">{car.yearMade}</td>
                      </tr>
                    </tbody>
                  </table>
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