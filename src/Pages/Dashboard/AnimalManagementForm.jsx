import React, { useState } from 'react';

const AnimalManagementForm = () => {
  const [formData, setFormData] = useState({
    tagNumber: '', name: '', species: '', breed: '', age: '', gender: '', weight: '', notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API integration
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Animal Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">Tag Number *</label>
          <input name="tagNumber" required onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Species *</label>
          <select name="species" required onChange={handleChange} className="w-full p-2 border rounded mt-1">
            <option value="">Select species</option>
            <option value="goat">Goat</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium">Breed</label>
          <input name="breed" onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Age (months)</label>
          <input name="age" type="number" onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender *</label>
          <select name="gender" required onChange={handleChange} className="w-full p-2 border rounded mt-1">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Weight (kg)</label>
        <input name="weight" type="number" onChange={handleChange} className="w-full p-2 border rounded mt-1" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Notes</label>
        <textarea name="notes" onChange={handleChange} className="w-full p-2 border rounded mt-1 h-24" />
      </div>

      <button type="submit" className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800">
        Add Animal
      </button>
    </form>
  );
};

export default AnimalManagementForm;