import React, { useState } from "react";
import { Car } from "./types";

interface CarDetailsProps {
  car: Car;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, carComments, setCarComments }) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setCarComments((prev) => ({
      ...prev,
      [car.id]: [...(prev[car.id] || []), newComment],
    }));
    setNewComment("");
  };

  return (
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

      <div className="comments-section mt-4">
        <h5 className="text-white">Comments:</h5>
        {carComments[car.id]?.map((comment, index) => (
          <p key={index} className="text-white">{comment}</p>
        ))}
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CarDetails;