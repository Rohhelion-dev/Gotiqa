import React, { useState } from 'react';
import axios from "axios";

const FeedingRecordsForm = () => {
  const [formData, setFormData] = useState({
    animal: '',
    feedType: '',
    quantity: '',
    unit: '',
    cost: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin submitted feeding record:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Feeding Records
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <input
          name="animal"
          placeholder="Animal"
          value={formData.animal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="feedType"
          placeholder="Feed Type"
          value={formData.feedType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <input
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded h-24 mb-6"
        placeholder="Notes"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
      >
        Add Feeding Record
      </button>
    </form>
  );
};

export default FeedingRecordsForm;