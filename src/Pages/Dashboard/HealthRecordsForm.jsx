import axios from "axios";
import React, { useState } from 'react';
import api from "../../api/api";


const HealthRecordsForm = ({ user }) => {
  if (user?.role !== "admin") {
    return null;
  }
  const [formData, setFormData] = useState({
    animal: '',
    healthStatus: '',
    temperature: '',
    weight: '',
    diagnosis: '',
    treatment: '',
    vetNotes: '',
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
      const response = await axios.post(
        'http://localhost:5000/health-records',
        formData
      );

      console.log('Server Response:', response.data);

      alert('Health record saved successfully!');

      setFormData({
        animal: '',
        healthStatus: '',
        temperature: '',
        weight: '',
        diagnosis: '',
        treatment: '',
        vetNotes: '',
      });

    } catch (error) {
      console.error('Error saving health record:', error);
      alert('Failed to save health record');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm p-8"
    >

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Health Records
        </h2>

        <p className="text-slate-500 mt-1">
          Record livestock health assessments, diagnoses and treatments.
        </p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Animal Tag Number *
          </label>

          <input
            type="text"
            name="animal"
            required
            value={formData.animal}
            onChange={handleChange}
            placeholder="e.g. GTQ-001"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Health Status *
          </label>

          <select
            name="healthStatus"
            required
            value={formData.healthStatus}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          >
            <option value="">Select Status</option>
            <option value="healthy">Healthy</option>
            <option value="sick">Sick</option>
            <option value="injured">Injured</option>
            <option value="recovering">Recovering</option>
          </select>
        </div>

      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Temperature (°C)
          </label>

          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="e.g. 39.5"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Weight (kg)
          </label>

          <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="e.g. 35.5"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

      </div>

      {/* Diagnosis */}
      <div className="mb-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Diagnosis
        </label>

        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rows="4"
          placeholder="Enter diagnosis details..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
        />

      </div>

      {/* Treatment */}
      <div className="mb-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Treatment
        </label>

        <textarea
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          rows="4"
          placeholder="Enter treatment administered..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
        />

      </div>

      {/* Vet Notes */}
      <div className="mb-8">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Veterinarian Notes
        </label>

        <textarea
          name="vetNotes"
          value={formData.vetNotes}
          onChange={handleChange}
          rows="5"
          placeholder="Additional veterinarian observations..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
        />

      </div>

      {/* Footer */}
      <div className="flex justify-end">

        <button
          type="submit"
          className="inline-flex items-center rounded-xl bg-emerald-900 px-8 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800 hover:shadow-md transition-all duration-200"
        >
          Save Health Record
        </button>

      </div>

    </form>
  );
};

export default HealthRecordsForm;