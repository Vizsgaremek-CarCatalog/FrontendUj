import React, { useState } from "react";
import axios from "../services/axiosConfig";
import { Car } from "../MainPageComponents/types";



interface AddCarFormProps {
  onAddCar: (car: Car) => void;
  setError: (error: string | null) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onAddCar, setError }) => {
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

  const validateForm = () => {
    if (!newCar.vehicle || !newCar.type || !newCar.color || !newCar.fuel || !newCar.manufacturer || !newCar.price) {
      setError("Please fill in all required fields (vehicle, type, color, fuel, manufacturer, price).");
      return false;
    }
    if (isNaN(newCar.mass) || newCar.mass <= 0) {
      setError("Mass must be a positive integer.");
      return false;
    }
    if (isNaN(newCar.price) || newCar.price <= 0) {
      setError("Price must be a positive integer.");
      return false;
    }
    if (newCar.yearMade < 1886 || newCar.yearMade > new Date().getFullYear()) {
      setError(`Year Made must be between 1886 and ${new Date().getFullYear()}.`);
      return false;
    }
    if (newCar.horsePower < 0) {
      setError("Horsepower must be a non-negative integer.");
      return false;
    }
    if (selectedImage) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(selectedImage.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or GIF).");
        return false;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (selectedImage.size > maxSize) {
        setError("Image file size must be less than 5MB.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    Object.entries(newCar).forEach(([key, value]) => {
      if (key !== "imageUrl") {
        formData.append(key, value.toString());
      }
    });
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post("http://localhost:3000/carcatalog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newCarData: Car = response.data;
      // Ensure imageUrl is set correctly, assuming backend returns it
      if (newCarData.imageUrl && !newCarData.imageUrl.startsWith("http")) {
        newCarData.imageUrl = `http://localhost:3000${newCarData.imageUrl}`;
      }
      onAddCar(newCarData);
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
      console.error("Error adding car:", error);
      setError(error.response?.data?.message || "Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Car</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: "vehicle", label: "Vehicle Name", type: "text" },
          { id: "type", label: "Car Type", type: "text" },
          { id: "color", label: "Car Color", type: "text" },
          { id: "fuel", label: "Fuel Type", type: "text" },
          { id: "manufacturer", label: "Manufacturer", type: "text" },
          { id: "mass", label: "Mass (kg)", type: "number" },
          { id: "price", label: "Price", type: "number" },
          { id: "yearMade", label: "Year Made", type: "number" },
          { id: "horsePower", label: "Horsepower", type: "number" },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
              {label}
            </label>
            <input
              type={type}
              id={id}
              value={newCar[id as keyof Omit<Car, "id">] as string | number}
              onChange={(e) =>
                setNewCar({
                  ...newCar,
                  [id]: type === "number" ? +e.target.value : e.target.value,
                })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Car Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={newCar.description}
            onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-y"
          />
        </div>
        <div className="md:col-span-2">
          <button
            onClick={handleSubmit}
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
  );
};

export default AddCarForm;