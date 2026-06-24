import React, { useState } from 'react';

const ActivityLogsForm = () => {
  const [formData, setFormData] = useState({
    action: '',
    type: 'Note',
    entity: 'General',
    details: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin submitted activity log:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Activity Logs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <input
          name="action"
          placeholder="Action"
          value={formData.action}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Note">Note</option>
          <option value="Create">Create</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
          <option value="View">View</option>
        </select>

        <select
          name="entity"
          value={formData.entity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="General">General</option>
          <option value="Animal">Animal</option>
          <option value="HealthRecord">Health Record</option>
          <option value="ProductionRecord">Production Record</option>
          <option value="BreedingRecord">Breeding Record</option>
          <option value="FeedingRecord">Feeding Record</option>
        </select>
      </div>

      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        className="w-full p-2 border rounded h-24 mb-6"
        placeholder="Details"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
      >
        Add Log
      </button>
    </form>
  );
};

export default ActivityLogsForm;