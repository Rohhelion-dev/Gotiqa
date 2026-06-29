import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AnimalManagementForm({ user }) {
  if (user?.role !== "admin") {
    return null;
  }

  const [formData, setFormData] = useState({
    tagNumber: "",
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    notes: "",
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
      const response = await axios.post(`${API_URL}/animals`, formData);

      console.log("Server Response:", response.data);

      alert("Animal added successfully!");

      setFormData({
        tagNumber: "",
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        weight: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error saving animal:", error);
      alert("Failed to save animal record.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Animal Management
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Register and manage livestock records
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Tag Number *
          </label>
          <input
            name="tagNumber"
            value={formData.tagNumber}
            required
            onChange={handleChange}
            placeholder="GTQ-001"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1 block">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Bella"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Species *
          </label>
          <select
            name="species"
            value={formData.species}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          >
            <option value="">Select species</option>
            <option value="goat">Goat</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Breed</label>
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Boer"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Age (months)
          </label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="text-xs text-slate-500 mb-1 block">
          Weight (kg)
        </label>
        <input
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
        />
      </div>

      <div className="mb-6">
        <label className="text-xs text-slate-500 mb-1 block">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional information about the animal..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white h-28 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-semibold hover:bg-emerald-800 hover:shadow-md transition"
        >
          Add Animal
        </button>
      </div>
    </form>
  );
}