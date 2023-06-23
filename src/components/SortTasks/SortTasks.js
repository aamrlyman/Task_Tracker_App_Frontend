import React, { useState } from 'react';

const SortTasks = ({sortOption, setSortOption, handleSort }) => {


  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption)
    handleSort(selectedOption);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="dueDate">Due Date</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};

export default SortTasks;