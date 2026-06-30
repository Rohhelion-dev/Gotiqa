import React, { useState } from 'react';
import api from "../../api/api";


const ActivityLogsForm = ({ user }) => {
  if (user?.role !== "admin") {
    return null;
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
        "/activity-logs",
        formData
      );

      console.log(response.data);

      alert("Activity log saved successfully!");

      setFormData({
        action: '',
        type: 'Note',
        entity: 'General',
        details: '',
      });

    } catch (error) {

      console.error(error);

      alert("Failed to save activity log");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6"
    >

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Activity Logs
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Track system actions and operational changes
        </p>
      </div>

      {/* GRID INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

        {/* ACTION */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Action
          </label>

          <input
            name="action"
            placeholder="Enter action"
            value={formData.action}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            required
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          >
            <option value="Note">Note</option>
            <option value="Create">Create</option>
            <option value="Update">Update</option>
            <option value="Delete">Delete</option>
            <option value="View">View</option>
          </select>
        </div>

        {/* ENTITY */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Entity
          </label>

          <select
            name="entity"
            value={formData.entity}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          >
            <option value="General">General</option>
            <option value="Animal">Animal</option>
            <option value="HealthRecord">Health Record</option>
            <option value="ProductionRecord">Production Record</option>
            <option value="BreedingRecord">Breeding Record</option>
            <option value="FeedingRecord">Feeding Record</option>
          </select>
        </div>

      </div>

      {/* DETAILS */}
      <div className="mb-6">
        <label className="text-xs text-slate-500 mb-1 block">
          Details
        </label>

        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Describe the activity..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white h-28 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
        />
      </div>

      {/* ACTION BUTTON */}
      <div className="flex justify-end">

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-semibold hover:bg-emerald-800 hover:shadow-md transition"
        >
          Add Log
        </button>

      </div>

    </form>

  );

};

export default ActivityLogsForm;