import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import { Car } from "./types";

interface CarDetailsProps {
  car: Car;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
  theme: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, carComments, setCarComments, theme }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments/${car.id}`);
        const comments = response.data.map((comment: { text: string }) => comment.text);
        setCarComments((prev) => ({
          ...prev,
          [car.id]: comments,
        }));
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [car.id, setCarComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(parseInt(userId, 10))) {
      setError("You must be logged in to add a comment.");
      return;
    }

    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/comments",
        {
          text: newComment,
          carId: car.id,
        },
        {
          headers: {
            "user-id": userId,
          },
        }
      );

      setCarComments((prev) => ({
        ...prev,
        [car.id]: [...(prev[car.id] || []), response.data.text],
      }));
      setNewComment("");
    } catch (err: any) {
      console.error("Error adding comment:", err);
      setError(err.response?.data?.message || "Failed to add comment. Please try again.");
    }
  };

  return (
    <div className={`card-body car-details ${theme}`}>
      <p><strong>Manufacturer:</strong> {car.manufacturer}</p>
      <p><strong>Type:</strong> {car.type}</p>
      <p><strong>Price:</strong> ${car.price}</p>
      <p><strong>Horse Power:</strong> {car.horsePower}</p>
      <p><strong>Color:</strong> {car.color}</p>
      <p><strong>Fuel:</strong> {car.fuel}</p>
      <p><strong>Mass:</strong> {car.mass}</p>
      <p><strong>Year:</strong> {car.yearMade}</p>
      <p><strong>Description:</strong> {car.description}</p>

      <div className="comments-section mt-4">
        <h5>Comments:</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {carComments[car.id]?.length > 0 ? (
          carComments[car.id].map((comment, index) => (
            <p key={index} className="mb-2">{comment}</p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <textarea
          className="form-control custom-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2 custom-btn"
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CarDetails;