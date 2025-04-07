import React, { useState, useEffect } from "react";
import axios from "./services/axiosConfig";
import CarCard from "./MainPageComponents/CarCard";
import CheckboxFilters from "./MainPageComponents/CheckBoxFilters";
import Filters from "./MainPageComponents/Filters";
import SearchAndSort from "./MainPageComponents/SearchAndSort";
import ComparisonModal from "./MainPageComponents/ComparisonModal";
import { Car } from "./MainPageComponents/types";

interface CarListProps {
  isLoggedIn: boolean;
}

const CarList: React.FC<CarListProps> = ({ isLoggedIn }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedCarsForComparison, setSelectedCarsForComparison] = useState<Car[]>([]);
  const [carComments, setCarComments] = useState<{ [key: number]: string[] }>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [horsePowerRange, setHorsePowerRange] = useState<[number, number]>([0, 1000]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Car | "">("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    manufacturers: [],
    types: [],
    colors: [],
    fuels: [],
    massOptions: [],
    yearOptions: [],
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/carcatalog");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const addToFavorites = async (carId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add cars to favorites.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/users/${userId}/favorites`,
        { carId },
        { headers: { "user-id": userId } }
      );
      alert("Car added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add car to favorites.");
    }
  };

  const filteredCars = cars
    .filter((car) => {
      const matchesSearch = car.vehicle.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesHorsePower = car.horsePower >= horsePowerRange[0] && car.horsePower <= horsePowerRange[1];
      const matchesFilters =
        (!filters.manufacturers.length || filters.manufacturers.includes(car.manufacturer)) &&
        (!filters.types.length || filters.types.includes(car.type)) &&
        (!filters.colors.length || filters.colors.includes(car.color)) &&
        (!filters.fuels.length || filters.fuels.includes(car.fuel)) &&
        (!filters.massOptions.length ||
          filters.massOptions.some((range) => {
            const [min, max] = range.includes(">")
              ? [3000, Infinity]
              : range.includes("<")
              ? [0, 1000]
              : range.split("-").map(Number);
            return car.mass >= min && (max ? car.mass <= max : true);
          })) &&
        (!filters.yearOptions.length ||
          filters.yearOptions.some((range) => {
            const [min, max] = range.includes(">")
              ? [2020, Infinity]
              : range.includes("<")
              ? [0, 2000]
              : range.split("-").map(Number);
            return car.yearMade >= min && (max ? car.yearMade <= max : true);
          }));
      return matchesSearch && matchesPrice && matchesHorsePower && matchesFilters;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortOrder === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Car Catalog</h1>
      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CheckboxFilters onFilterChange={setFilters} />
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          horsePowerRange={horsePowerRange}
          setHorsePowerRange={setHorsePowerRange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car.id} className="relative">
            <CarCard
              car={car}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              setSelectedCarsForComparison={setSelectedCarsForComparison}
              carComments={carComments}
              setCarComments={setCarComments}
              isLoggedIn={isLoggedIn} // Pass isLoggedIn to CarCard
            />
            {isLoggedIn && (
              <button
                onClick={() => addToFavorites(car.id)}
                className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Add to Favorites
              </button>
            )}
          </div>
        ))}
      </div>
      <ComparisonModal
        selectedCars={selectedCarsForComparison}
        onClose={() => setSelectedCarsForComparison([])}
      />
    </div>
  );
};

export default CarList;