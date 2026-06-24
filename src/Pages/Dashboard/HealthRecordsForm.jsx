import React, { useState } from 'react';
import axios from 'axios';

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
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Health Records
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Animal Tag Number *
          </label>

          <input
            type="text"
            name="animal"
            required
            value={formData.animal}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g GTQ-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Health Status *
          </label>

          <select
            name="healthStatus"
            required
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

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Temperature (°C)
          </label>

          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g 39.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Weight (kg)
          </label>

          <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g 35.5"
          />
        </div>
      </div>

      {/* Diagnosis */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Diagnosis
        </label>

        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
          placeholder="Enter diagnosis details..."
        />
      </div>

      {/* Treatment */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Treatment
        </label>

        <textarea
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
          placeholder="Enter treatment administered..."
        />
      </div>

      {/* Vet Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium">
          Veterinarian Notes
        </label>

        <textarea
          name="vetNotes"
          value={formData.vetNotes}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
          placeholder="Additional veterinarian observations..."
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition-colors"
      >
        Add Health Record
      </button>
    </form>
  );
};

export default HealthRecordsForm;