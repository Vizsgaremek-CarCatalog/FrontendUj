import React, { useState, useEffect } from "react";
import axios from "./services/axiosConfig";
import { Car, Comment } from "./MainPageComponents/types";
import AddCarForm from "./components/AddCarForm";
import List from "./components/List";

const AdminDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCarsAndComments();
  }, []);

  const fetchCarsAndComments = async () => {
    try {
      const carsResponse = await axios.get("http://localhost:3000/carcatalog");
      setCars(carsResponse.data);

      const commentsByCar: { [key: number]: Comment[] } = {};
      await Promise.all(
        carsResponse.data.map(async (car: Car) => {
          try {
            const commentsResponse = await axios.get(`http://localhost:3000/comments/${car.id}`);
            commentsByCar[car.id] = commentsResponse.data;
          } catch (err) {
            console.error(`Error fetching comments for car ${car.id}:`, err);
          }
        })
      );
      setComments(commentsByCar);
    } catch (error) {
      setError("Failed to load cars or comments.");
    }
  };

  const handleAddCar = (car: Car) => {
    setCars([...cars, car]);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-6 w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <AddCarForm onAddCar={handleAddCar} setError={setError} />
        <List
          cars={cars}
          comments={comments}
          setCars={setCars}
          setComments={setComments}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;