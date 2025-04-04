import React, { useState, useEffect } from "react";
import axios from "./services/axiosConfig";

interface Car {
  id: number;
  vehicle: string;
  type: string;
  color: string;
  fuel: string;
  manufacturer: string;
  mass: number;
  imageUrl?: string;
  price: number;
  description: string;
  yearMade: number;
  horsePower: number;
}

interface Comment {
  id: number;
  carId: number;
  text: string;
}

const AdminDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    vehicle: "",
    type: "",
    color: "",
    fuel: "",
    manufacturer: "",
    mass: 0,
    imageUrl: "",
    price: 0,
    description: "",
    yearMade: new Date().getFullYear(),
    horsePower: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});

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
      console.error("Error fetching cars:", error);
      setError("Failed to load cars or comments.");
    }
  };

  const addCar = async () => {
    if (!newCar.vehicle || !newCar.type || !newCar.color || !newCar.price) {
      setError("Please fill in all the required fields.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/carcatalog", newCar);
      setCars([...cars, response.data]);
      setNewCar({
        vehicle: "",
        type: "",
        color: "",
        fuel: "",
        manufacturer: "",
        mass: 0,
        imageUrl: "",
        price: 0,
        description: "",
        yearMade: new Date().getFullYear(),
        horsePower: 0,
      });
    } catch (error) {
      console.error("Error adding car", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/carcatalog/${id}`);
      setCars(cars.filter((car) => car.id !== id));
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[id];
        return newComments;
      });
    } catch (error) {
      console.error("Error deleting car", error);
    }
  };

  const deleteComment = async (carId: number, commentId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(parseInt(userId, 10))) {
      setError("You must be logged in as an admin to delete comments.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: {
          "user-id": userId,
        },
      });
      setComments((prev) => ({
        ...prev,
        [carId]: prev[carId].filter((comment) => comment.id !== commentId),
      }));
    } catch (error: any) {
      console.error("Error deleting comment:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  const toggleComments = (carId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Car Form */}
      <div>
        <h3>Add New Car</h3>
        {error && <div>{error}</div>}
        <div>
          <div>
            <label htmlFor="vehicle">Vehicle Name</label>
            <input
              type="text"
              id="vehicle"
              placeholder="Enter vehicle name"
              value={newCar.vehicle}
              onChange={(e) => setNewCar({ ...newCar, vehicle: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="type">Car Type</label>
            <input
              type="text"
              id="type"
              placeholder="Enter car type"
              value={newCar.type}
              onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="color">Car Color</label>
            <input
              type="text"
              id="color"
              placeholder="Enter car color"
              value={newCar.color}
              onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="fuel">Fuel Type</label>
            <input
              type="text"
              id="fuel"
              placeholder="Enter fuel type"
              value={newCar.fuel}
              onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              placeholder="Enter manufacturer"
              value={newCar.manufacturer}
              onChange={(e) => setNewCar({ ...newCar, manufacturer: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="mass">Mass (kg)</label>
            <input
              type="number"
              id="mass"
              placeholder="Enter mass in kg"
              value={newCar.mass}
              onChange={(e) => setNewCar({ ...newCar, mass: +e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Enter image URL"
              value={newCar.imageUrl}
              onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={newCar.price}
              onChange={(e) => setNewCar({ ...newCar, price: +e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={newCar.description}
              onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="yearMade">Year Made</label>
            <input
              type="number"
              id="yearMade"
              value={newCar.yearMade}
              onChange={(e) => setNewCar({ ...newCar, yearMade: +e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="horsePower">Horse Power</label>
            <input
              type="number"
              id="horsePower"
              value={newCar.horsePower}
              onChange={(e) => setNewCar({ ...newCar, horsePower: +e.target.value })}
            />
          </div>
          <button onClick={addCar} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Car"}
          </button>
        </div>
      </div>

      {/* Car List */}
      <h3>Cars in Catalog</h3>
      <div>
        {cars.map((car) => (
          <div key={car.id}>
            {car.imageUrl && <img src={car.imageUrl} alt={car.vehicle} />}
            <div>
              <h4>{car.vehicle}</h4>
              <p>{car.color} - {car.price}$ - {car.yearMade}</p>
              <div>
                <button onClick={() => deleteCar(car.id)}>
                  Delete Car
                </button>
                <button onClick={() => toggleComments(car.id)}>
                  Comments ({(comments[car.id] || []).length})
                </button>
              </div>

              {/* Comments Section */}
              {openComments[car.id] && (
                <div>
                  {(comments[car.id] || []).length > 0 ? (
                    comments[car.id].map((comment) => (
                      <div key={comment.id}>
                        {comment.text}
                        <button onClick={() => deleteComment(car.id, comment.id)}>
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;