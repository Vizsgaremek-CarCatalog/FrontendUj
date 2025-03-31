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
  <div className="mb-3 d-flex justify-content-between">
    <input
      type="text"
      className="form-control w-50"
      placeholder="Search by vehicle name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <select
      className="form-select w-25"
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value as keyof Car)}
    >
      <option value="">Sort by</option>
      <option value="price">Price</option>
      <option value="yearMade">Year Made</option>
      <option value="horsePower">Horse Power</option>
      <option value="vehicle">Name</option>
    </select>
    <button className="btn btn-secondary" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
      {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
    </button>
  </div>
);

export default SearchAndSort;