import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import { Car } from "../MainPageComponents/types";

const Profile: React.FC = () => {
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}/favorites`, {
        headers: { "user-id": userId },
      });
      setFavorites(response.data); // Response is an array of cars
    } catch (err: any) {
      console.error("Error fetching favorites:", err);
      setError(err.response?.data?.message || "Failed to load favorites.");
    }
  };

  const removeFavorite = async (carId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found.");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/users/${userId}/favorites/${carId}`, {
        headers: { "user-id": userId },
      });
      setFavorites(favorites.filter((car) => car.id !== carId));
    } catch (err: any) {
      console.error("Error removing favorite:", err);
      setError(err.response?.data?.message || "Failed to remove favorite.");
    }
  };


  const handlePasswordChange = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      }, {
        headers: { "user-id": userId },
      });
      setPasswordChangeSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Error changing password:", err);
      setError(err.response?.data?.message || "Failed to change password.");
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Favorite Cars</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {passwordChangeSuccess && <div className="text-green-500 mb-4">{passwordChangeSuccess}</div>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-2 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-2 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 p-2 border rounded"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Change Password
        </button>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Favorite Cars</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven't added any favorite cars yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {car.imageUrl && (
                <img
                  src={car.imageUrl}
                  alt={car.vehicle}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{car.vehicle}</h3>
                <p className="text-gray-600 mb-4">
                  {car.color} - ${car.price.toLocaleString()} - {car.yearMade}
                </p>
                <button
                  onClick={() => removeFavorite(car.id)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;