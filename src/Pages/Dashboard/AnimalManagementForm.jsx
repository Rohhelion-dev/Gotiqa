import React, { useState } from 'react';
import axios from 'axios';

const AnimalManagementForm = () => {
  const [formData, setFormData] = useState({
    tagNumber: '',
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    notes: '',
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
        'http://localhost:5000/animals',
        formData
      );

      console.log('Server Response:', response.data);

      alert('Animal added successfully!');

      setFormData({
        tagNumber: '',
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        weight: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error saving animal:', error);

      alert('Failed to save animal record.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Animal Management
      </h2>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Tag Number *
          </label>
          <input
            name="tagNumber"
            value={formData.tagNumber}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="GTQ-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Bella"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Species *
          </label>
          <select
            name="species"
            value={formData.species}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select species</option>
            <option value="goat">Goat</option>
          </select>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Breed
          </label>
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Boer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Age (months)
          </label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Weight */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Weight (kg)
        </label>
        <input
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          min="0"
          step="0.1"
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
          placeholder="Additional information about the animal..."
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition-colors"
      >
        Add Animal
      </button>
    </form>
  );
};

export default AnimalManagementForm;