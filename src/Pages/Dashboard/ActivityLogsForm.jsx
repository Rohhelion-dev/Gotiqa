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
    <div>
      <h2>Activity Logs</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="action"
          placeholder="Action"
          value={formData.action}
          onChange={handleChange}
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
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
        >
          <option value="General">General</option>
          <option value="Animal">Animal</option>
          <option value="HealthRecord">Health Record</option>
          <option value="ProductionRecord">Production Record</option>
          <option value="BreedingRecord">Breeding Record</option>
          <option value="FeedingRecord">Feeding Record</option>
        </select>

        <textarea
          name="details"
          placeholder="Details"
          value={formData.details}
          onChange={handleChange}
        />

        <button type="submit">
          Add Log
        </button>
      </form>
    </div>
  );
};

export default ActivityLogsForm;