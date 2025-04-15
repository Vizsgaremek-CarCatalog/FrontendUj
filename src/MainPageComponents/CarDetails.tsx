import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import { Car } from "./types";

interface CarDetailsProps {
  car: Car;
  carComments: { [key: number]: string[] };
  setCarComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
  isLoggedIn: boolean;
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
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Manufacturer</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.manufacturer}</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Type</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.type}</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Price</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">${car.price.toLocaleString()}</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Horsepower</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.horsePower} HP</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Color</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.color}</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Fuel</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.fuel}</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Mass</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.mass} kg</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600">Year</th>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{car.yearMade}</td>
          </tr>
        </tbody>
      </table>

      <p className="text-gray-600 dark:text-gray-400 mb-6 text-left">{car.description}</p>

      <div className="mt-6">
        <h5 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Comments</h5>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          {carComments[car.id]?.length > 0 ? (
            carComments[car.id].map((comment, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-400 py-2 border-b border-gray-200 dark:border-gray-600">
                {comment}
              </p>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 py-2">No comments yet.</p>
          )}
        </div>
        <textarea
          placeholder={isLoggedIn ? "Add a comment..." : "Log in to add a comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!isLoggedIn}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 mb-4 resize-y disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleAddComment}
          disabled={!isLoggedIn || !newComment.trim()}
          className={`px-4 py-2 rounded-lg text-white dark:text-gray-200 transition-colors duration-200 ${
            isLoggedIn && newComment.trim()
              ? "bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          }`}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CarDetails;