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
  const [search, setSearch] = useState("");
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
    if (!newCar.vehicle || !newCar.type || !newCar.color || !newCar.fuel || !newCar.manufacturer || !newCar.price) {
      setError("Please fill in all required fields (vehicle, type, color, fuel, manufacturer, price).");
      return;
    }
    if (isNaN(newCar.mass) || newCar.mass <= 0) {
      setError("Mass must be a positive integer.");
      return;
    }
    if (isNaN(newCar.price) || newCar.price <= 0) {
      setError("Price must be a positive integer.");
      return;
    }
    if (newCar.yearMade && (isNaN(newCar.yearMade) || newCar.yearMade < 1886 || newCar.yearMade > new Date().getFullYear())) {
      setError(`Year Made must be between 1886 and ${new Date().getFullYear()}.`);
      return;
    }
    if (newCar.horsePower && (isNaN(newCar.horsePower) || newCar.horsePower < 0)) {
      setError("Horsepower must be a non-negative integer.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("vehicle", newCar.vehicle);
    formData.append("type", newCar.type);
    formData.append("color", newCar.color);
    formData.append("fuel", newCar.fuel);
    formData.append("manufacturer", newCar.manufacturer);
    formData.append("mass", newCar.mass.toString());
    formData.append("price", newCar.price.toString());
    formData.append("description", newCar.description);
    formData.append("yearMade", newCar.yearMade.toString());
    formData.append("horsePower", newCar.horsePower.toString());
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post("http://localhost:3000/carcatalog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      setSelectedImage(null);
    } catch (error: any) {
      console.error("Error adding car:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to add car.");
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
      setError("Failed to delete car.");
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

  const filteredCars = cars.filter((car) =>
    car.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-6 w-full max-w-7xl"> {/* Centered container with max width */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

       

        {/* Add Car Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Car</h3>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vehicle" className="block text-gray-700 font-medium mb-2">Vehicle Name</label>
              <input
                type="text"
                id="vehicle"
                placeholder="Enter vehicle name"
                value={newCar.vehicle}
                onChange={(e) => setNewCar({ ...newCar, vehicle: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Car Type</label>
              <input
                type="text"
                id="type"
                placeholder="Enter car type"
                value={newCar.type}
                onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-gray-700 font-medium mb-2">Car Color</label>
              <input
                type="text"
                id="color"
                placeholder="Enter car color"
                value={newCar.color}
                onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="fuel" className="block text-gray-700 font-medium mb-2">Fuel Type</label>
              <input
                type="text"
                id="fuel"
                placeholder="Enter fuel type"
                value={newCar.fuel}
                onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="manufacturer" className="block text-gray-700 font-medium mb-2">Manufacturer</label>
              <input
                type="text"
                id="manufacturer"
                placeholder="Enter manufacturer"
                value={newCar.manufacturer}
                onChange={(e) => setNewCar({ ...newCar, manufacturer: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="mass" className="block text-gray-700 font-medium mb-2">Mass (kg)</label>
              <input
                type="number"
                id="mass"
                placeholder="Enter mass in kg"
                value={newCar.mass}
                onChange={(e) => setNewCar({ ...newCar, mass: +e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Car Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                value={newCar.price}
                onChange={(e) => setNewCar({ ...newCar, price: +e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={newCar.description}
                onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-y"
              />
            </div>
            <div>
              <label htmlFor="yearMade" className="block text-gray-700 font-medium mb-2">Year Made</label>
              <input
                type="number"
                id="yearMade"
                value={newCar.yearMade}
                onChange={(e) => setNewCar({ ...newCar, yearMade: +e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="horsePower" className="block text-gray-700 font-medium mb-2">Horsepower</label>
              <input
                type="number"
                id="horsePower"
                value={newCar.horsePower}
                onChange={(e) => setNewCar({ ...newCar, horsePower: +e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <button
                onClick={addCar}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-lg text-white transition-colors duration-200 ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? "Adding..." : "Add Car"}
              </button>
            </div>
          </div>
        </div>

 {/* Search Input */}
 <div className="mb-6">
          <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
            Search Cars
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by vehicle name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>



        {/* Car List */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Cars in Catalog</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {car.imageUrl && (
                <img
                  src={car.imageUrl}
                  alt={car.vehicle}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{car.vehicle}</h4>
                <p className="text-gray-600 mb-4">
                  {car.color} - ${car.price.toLocaleString()} - {car.yearMade}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete Car
                  </button>
                  <button
                    onClick={() => toggleComments(car.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Comments ({(comments[car.id] || []).length})
                  </button>
                </div>

                {/* Comments Section */}
                {openComments[car.id] && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    {(comments[car.id] || []).length > 0 ? (
                      comments[car.id].map((comment) => (
                        <div key={comment.id} className="flex justify-between items-center mb-2">
                          <p className="text-gray-600">{comment.text}</p>
                          <button
                            onClick={() => deleteComment(car.id, comment.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;