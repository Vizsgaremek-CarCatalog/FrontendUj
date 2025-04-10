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
      setFavorites(response.data);
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

    // Client-side validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3000/users/${userId}/change-password`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: { "user-id": userId },
        }
      );
      setPasswordChangeSuccess("Password changed successfully!");
      setError(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Clear success message after 3 seconds
      setTimeout(() => setPasswordChangeSuccess(null), 3000);
    } catch (err: any) {
      console.error("Error changing password:", err);
      setError(err.response?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-0 m-0">
      <div className="w-full p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Profile</h1>

        {/* Change Password Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          {passwordChangeSuccess && (
            <div className="text-green-500 mb-4 text-center">{passwordChangeSuccess}</div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            <div>
              <button
                onClick={handlePasswordChange}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Favorite Cars Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Your Favorite Cars</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600 text-center">You haven't added any favorite cars yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
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
    </div>
  );
};

export default Profile;