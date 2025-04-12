import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import { Car } from "./types";

interface CarDetailsProps {
  car: Car;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
  isLoggedIn: boolean; // Add isLoggedIn prop
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, carComments, setCarComments, isLoggedIn }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
    if (!isLoggedIn) {
      setError("You must be logged in to add a comment.");
      return;
    }
    if (!newComment.trim()) return;

    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(parseInt(userId, 10))) {
      setError("User ID not found.");
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
    <div className="w-full">
      <table className="table-auto w-full text-left border-collapse mb-6">
        <tbody>
          <tr className="border-b">
            <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Manufacturer</th>
            <td className="py-2 px-4">{car.manufacturer}</td>
          </tr>
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
            <th className="py-2 px-4 font-medium text-gray-700 bg-gray-100">Color</th>
            <td className="py-2 px-4">{car.color}</td>
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

      <p className="text-gray-600 mb-6 text-left">{car.description}</p>

      <div className="mt-6">
        <h5 className="text-xl font-bold text-gray-800 mb-4">Comments</h5>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          {carComments[car.id]?.length > 0 ? (
            carComments[car.id].map((comment, index) => (
              <p key={index} className="text-gray-600 py-2 border-b border-gray-200">
                {comment}
              </p>
            ))
          ) : (
            <p className="text-gray-600 py-2">No comments yet.</p>
          )}
        </div>
        <textarea
          placeholder={isLoggedIn ? "Add a comment..." : "Log in to add a comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!isLoggedIn}
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 mb-4 resize-y disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleAddComment}
          disabled={!isLoggedIn || !newComment.trim()}
          className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
            isLoggedIn && newComment.trim()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CarDetails;