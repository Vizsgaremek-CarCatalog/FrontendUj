import React from "react";
import { Car } from "./types";

interface ComparisonModalProps {
  selectedCars: Car[];
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ selectedCars, onClose }) => {
  if (selectedCars.length !== 2) return null;

  return (
    <div className="modal fade show d-block" style={{ display: "block" }} tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Compare Cars</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-between">
              {selectedCars.map((car) => (
                <div key={car.id} className="card car-card">
                  <img
                    src={car.imageUrl || "https://via.placeholder.com/400x250?text=Car+Image"}
                    alt={car.vehicle}
                    className="car-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{car.vehicle}</h5>
                    <p><strong>Price:</strong> ${car.price}</p>
                    <p><strong>Horse Power:</strong> {car.horsePower}</p>
                    <p><strong>Fuel:</strong> {car.fuel}</p>
                    <p><strong>Year:</strong> {car.yearMade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
