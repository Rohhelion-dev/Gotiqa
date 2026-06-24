import React, { useState } from 'react';

const BreedingRecordsForm = () => {
  const [formData, setFormData] = useState({
    animalTag: '',
    breedingDate: '',
    matingType: '',
    sireTag: '',
    expectedKiddingDate: '',
    offspringCount: '',
    offspringHealth: '',
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
    console.log('Admin submitted breeding record:', formData);

    // Future API integration goes here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Breeding Records
      </h2>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Animal Tag Number *
          </label>
          <input
            name="animalTag"
            required
            value={formData.animalTag}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g GTQ-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Breeding Date *
          </label>
          <input
            type="date"
            name="breedingDate"
            required
            value={formData.breedingDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Mating Type
          </label>
          <select
            name="matingType"
            value={formData.matingType}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Type</option>
            <option value="natural">Natural Mating</option>
            <option value="artificial">Artificial Insemination</option>
          </select>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">
            Sire Tag Number
          </label>
          <input
            name="sireTag"
            value={formData.sireTag}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g GTQ-S001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Expected Kidding Date
          </label>
          <input
            type="date"
            name="expectedKiddingDate"
            value={formData.expectedKiddingDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Number of Kids Born
          </label>
          <input
            type="number"
            name="offspringCount"
            value={formData.offspringCount}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            min="0"
          />
        </div>
      </div>

      {/* Health Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Offspring Health Status
        </label>
        <textarea
          name="offspringHealth"
          value={formData.offspringHealth}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
          placeholder="Describe health condition of offspring..."
        />
      </div>

      {/* Notes Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 h-24"
          placeholder="Any breeding observations or remarks..."
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition-colors"
      >
        Add Breeding Record
      </button>
    </form>
  );
};

export default BreedingRecordsForm;