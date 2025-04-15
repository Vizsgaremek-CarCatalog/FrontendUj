import React from "react";
import { Car } from "./types";

interface SearchAndSortProps {
  search: string;
  setSearch: (value: string) => void;
  sortKey: keyof Car | "";
  setSortKey: (value: keyof Car | "") => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  search,
  setSearch,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <input
        type="text"
        placeholder="Search by vehicle name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
      />
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as keyof Car)}
        className="w-full sm:w-auto p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
      >
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="yearMade">Year Made</option>
        <option value="horsePower">Horsepower</option>
        <option value="vehicle">Name</option>
      </select>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="w-full sm:w-auto px-4 py-3 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {sortOrder === "asc" ? (
          <>
            <span>⬆</span> Ascending
          </>
        ) : (
          <>
            <span>⬇</span> Descending
          </>
        )}
      </button>
    </div>
  </div>
);

export default SearchAndSort;