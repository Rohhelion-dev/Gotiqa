import React, { useState } from 'react';

const HealthRecordsForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin submitted health record:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Health Records
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Animal *
          </label>
          <input
            name="animal"
            value={formData.animal}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Health Status *
          </label>
          <select
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Status</option>
            <option value="healthy">Healthy</option>
            <option value="sick">Sick</option>
            <option value="injured">Injured</option>
            <option value="recovering">Recovering</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Temperature (°C)
          </label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Diagnosis
        </label>
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Treatment
        </label>
        <textarea
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">
          Veterinarian Notes
        </label>
        <textarea
          name="vetNotes"
          value={formData.vetNotes}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
      >
        Add Health Record
      </button>
    </form>
  );
};

export default HealthRecordsForm;