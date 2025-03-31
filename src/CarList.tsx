import React, { useState, useEffect } from "react";
import axios from "./services/axiosConfig";
import { Car } from "./MainPageComponents/types";
import SearchAndSort from "./MainPageComponents/SearchAndSort";
import Filters from "./MainPageComponents/Filters";
import CheckboxFilters from "./MainPageComponents/CheckBoxFilters";
import CarCard from "./MainPageComponents/CarCard";
import ComparisonModal from "./MainPageComponents/ComparisonModal";

interface CarListProps {
  theme: string;
}

interface CheckboxFiltersState {
  manufacturers: string[];
  types: string[];
  colors: string[];
  fuels: string[];
  massOptions: string[];
  yearOptions: string[];
}

const CarList: React.FC<CarListProps> = ({ theme }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedCarsForComparison, setSelectedCarsForComparison] = useState<Car[]>([]);
  const [search, setSearch] = useState<string>("");
  
  const [sortKey, setSortKey] = useState<keyof Car | "">("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [horsePowerRange, setHorsePowerRange] = useState<[number, number]>([0, 1000]);
  const [checkboxFilters, setCheckboxFilters] = useState<CheckboxFiltersState>({
    manufacturers: [],
    types: [],
    colors: [],
    fuels: [],
    massOptions: [],
    yearOptions: [],
  });
  const [carComments, setCarComments] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsResponse = await axios.get("http://localhost:3000/carcatalog");
        setCars(carsResponse.data);
        setFilteredCars(carsResponse.data);
  
        const commentsByCar: { [key: number]: string[] } = {};
        await Promise.all(
          carsResponse.data.map(async (car: Car) => {
            const commentsResponse = await axios.get(`http://localhost:3000/comments/${car.id}`);
            commentsByCar[car.id] = commentsResponse.data.map((c: { text: string }) => c.text);
          })
        );
        setCarComments(commentsByCar);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to load cars or comments.");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    let updatedCars = cars.filter((car) => {
      // Base filters (search, price, horsepower)
      const matchesSearch = car.vehicle.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesHorsePower = car.horsePower >= horsePowerRange[0] && car.horsePower <= horsePowerRange[1];

      // Checkbox filters: only apply if the category has selections, otherwise pass all
      const matchesManufacturers =
        checkboxFilters.manufacturers.length === 0 || checkboxFilters.manufacturers.includes(car.manufacturer);
      const matchesTypes = checkboxFilters.types.length === 0 || checkboxFilters.types.includes(car.type);
      const matchesColors = checkboxFilters.colors.length === 0 || checkboxFilters.colors.includes(car.color);
      const matchesFuels = checkboxFilters.fuels.length === 0 || checkboxFilters.fuels.includes(car.fuel);

      const matchesMass =
        checkboxFilters.massOptions.length === 0 ||
        checkboxFilters.massOptions.some((option) => {
          if (option === "<1000 kg") return car.mass < 1000;
          if (option === "1000-2000 kg") return car.mass >= 1000 && car.mass <= 2000;
          if (option === "2000-3000 kg") return car.mass >= 2000 && car.mass <= 3000;
          if (option === ">3000 kg") return car.mass > 3000;
          return false;
        });

      const matchesYear =
        checkboxFilters.yearOptions.length === 0 ||
        checkboxFilters.yearOptions.some((option) => {
          if (option === "<2000") return car.yearMade < 2000;
          if (option === "2000-2010") return car.yearMade >= 2000 && car.yearMade <= 2010;
          if (option === "2010-2020") return car.yearMade >= 2010 && car.yearMade <= 2020;
          if (option === ">2020") return car.yearMade > 2020;
          return false;
        });

      // Combine all conditions
      return (
        matchesSearch &&
        matchesPrice &&
        matchesHorsePower &&
        matchesManufacturers &&
        matchesTypes &&
        matchesColors &&
        matchesFuels &&
        matchesMass &&
        matchesYear
      );
    });

    if (sortKey) {
      updatedCars.sort((a, b) =>
        sortOrder === "asc" ? (a[sortKey] > b[sortKey] ? 1 : -1) : (a[sortKey] < b[sortKey] ? 1 : -1)
      );
    }

    setFilteredCars(updatedCars);
    console.log("Filtered Cars:", updatedCars); // Debug log
  }, [search, sortKey, sortOrder, priceRange, horsePowerRange, checkboxFilters, cars]);

  return (
    <div className={`car-list ${theme}`}>
      <h1 className="text-center mb-4">Verdák</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        theme={theme}
      />
      <Filters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        horsePowerRange={horsePowerRange}
        setHorsePowerRange={setHorsePowerRange}
        theme={theme}
      />
      <CheckboxFilters onFilterChange={setCheckboxFilters} theme={theme} />

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              setSelectedCarsForComparison={setSelectedCarsForComparison}
              carComments={carComments}
              setCarComments={setCarComments}
            />
          ))
        ) : (
          <p className="text-center">No cars match your filters.</p>
        )}
      </div>

      <ComparisonModal
        selectedCars={selectedCarsForComparison}
        onClose={() => setSelectedCarsForComparison([])}
      />
    </div>
  );
};

export default CarList;