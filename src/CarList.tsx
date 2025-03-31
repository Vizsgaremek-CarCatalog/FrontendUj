// CarList.tsx
import React, { useState, useEffect } from "react";
import axios from "./services/axiosConfig";
import SearchAndSort from "./MainPageComponents/SearchAndSort";
import Filters from "./MainPageComponents/Filters";
import CarCard from "./MainPageComponents/CarCard";
import ComparisonModal from "./MainPageComponents/ComparisonModal";
import { Car } from "./MainPageComponents/types";

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedCarsForComparison, setSelectedCarsForComparison] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Car | "">("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [horsePowerRange, setHorsePowerRange] = useState<[number, number]>([0, 1000]);
  const [filters, setFilters] = useState({ type: "", color: "", fuel: "", manufacturer: "" });
  const [carComments, setCarComments] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/carcatalog")
      .then((response) => {
        setCars(response.data);
        setFilteredCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again.");
      });
  }, []);

  useEffect(() => {
    let updatedCars = cars.filter((car) =>
      car.vehicle.toLowerCase().includes(search.toLowerCase()) &&
      car.price >= priceRange[0] && car.price <= priceRange[1] &&
      car.horsePower >= horsePowerRange[0] && car.horsePower <= horsePowerRange[1] &&
      (filters.type ? car.type === filters.type : true) &&
      (filters.color ? car.color === filters.color : true) &&
      (filters.fuel ? car.fuel === filters.fuel : true) &&
      (filters.manufacturer ? car.manufacturer === filters.manufacturer : true)
    );

    if (sortKey) {
      updatedCars.sort((a, b) =>
        sortOrder === "asc" ? (a[sortKey] > b[sortKey] ? 1 : -1) : (a[sortKey] < b[sortKey] ? 1 : -1)
      );
    }

    setFilteredCars(updatedCars);
  }, [search, sortKey, sortOrder, priceRange, horsePowerRange, filters, cars]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-white">Car Comparison App</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <Filters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        horsePowerRange={horsePowerRange}
        setHorsePowerRange={setHorsePowerRange}
      />

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            setSelectedCarsForComparison={setSelectedCarsForComparison}
            carComments={carComments}
            setCarComments={setCarComments}
          />
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