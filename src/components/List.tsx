import React, { useState } from "react";
import axios from "../services/axiosConfig";
import { Car, Comment } from "../MainPageComponents/types";
import SearchAndSort from "../MainPageComponents/SearchAndSort";
import CarCard from "../MainPageComponents/CarCard";

interface CarListProps {
  cars: Car[];
  comments: { [key: number]: Comment[] };
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  setComments: React.Dispatch<React.SetStateAction<{ [key: number]: Comment[] }>>;
  setError: (error: string | null) => void;
}

const List: React.FC<CarListProps> = ({ cars, comments, setCars, setComments, setError }) => {
  const [search, setSearch] = useState("");
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
  const [sortKey, setSortKey] = useState<keyof Car | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
      setError("Failed to delete car.");
    }
  };

  const deleteComment = async (carId: number, commentId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(parseInt(userId, 10))) {
      setError("You must be logged in to delete comments.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: { "user-id": userId, admin: "true" },
      });
      setComments((prev) => ({
        ...prev,
        [carId]: prev[carId].filter((comment) => comment.id !== commentId),
      }));
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  const toggleComments = (carId: number) => {
    setOpenComments((prev) => ({ ...prev, [carId]: !prev[carId] }));
  };

  const filteredCars = cars
    .filter((car) => car.vehicle.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });

  return (
    <div>
      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Cars in Catalog</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car.id} className="relative">
            <CarCard
              car={car}
              selectedCar={null}
              setSelectedCar={() => {}}
              setSelectedCarsForComparison={() => {}}
              carComments={{ [car.id]: (comments[car.id] || []).map((c) => c.text) }}
              setCarComments={() => {}}
              isLoggedIn={true}
              resetComparison={false}
              isAdmin={true}
              onDeleteCar={() => deleteCar(car.id)}
              onToggleComments={() => toggleComments(car.id)}
              commentCount={(comments[car.id] || []).length}
            />
            {openComments[car.id] && (
              <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                {(comments[car.id] || []).length > 0 ? (
                  comments[car.id].map((comment) => (
                    <div key={comment.id} className="flex justify-between items-center mb-2">
                      <p className="text-gray-600">{comment.text}</p>
                      <button
                        onClick={() => deleteComment(car.id, comment.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
        ))}
      </div>
    </div>
  );
};

export default List;