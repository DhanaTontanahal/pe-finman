import React from "react";

const ClientFilter = ({ filter, setFilter, handleSearch }) => {
  return (
    <div className="client-manager-header">
      <div className="filter-container">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="active">Show active</option>
          <option value="archived">Show archived</option>
          <option value="all">Show all</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ClientFilter;
