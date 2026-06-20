import React, { useState } from 'react';
import { FormField } from '../../components/Shared';

const fieldClass = 'w-full p-2 border rounded mt-1';

const AnimalManagementForm = () => {
  const [formData, setFormData] = useState({
    tagNumber: '', name: '', species: '', breed: '', age: '', gender: '', weight: '', notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin submitted animal data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Animal Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <FormField label="Tag Number *" name="tagNumber" required onChange={handleChange} inputClassName={fieldClass} />
        <FormField label="Name" name="name" onChange={handleChange} inputClassName={fieldClass} />
        <FormField
          label="Species *"
          name="species"
          required
          onChange={handleChange}
          inputClassName={fieldClass}
          options={[{ value: 'goat', label: 'Goat' }]}
          placeholder="Select species"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <FormField label="Breed" name="breed" onChange={handleChange} inputClassName={fieldClass} />
        <FormField label="Age (months)" name="age" type="number" onChange={handleChange} inputClassName={fieldClass} />
        <FormField
          label="Gender *"
          name="gender"
          required
          onChange={handleChange}
          inputClassName={fieldClass}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          placeholder="Select gender"
        />
      </div>

      <FormField label="Weight (kg)" name="weight" type="number" onChange={handleChange} inputClassName={fieldClass} className="mb-4" />
      <FormField label="Notes" name="notes" type="textarea" onChange={handleChange} inputClassName={`${fieldClass} h-24`} className="mb-6" />

      <button type="submit" className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800">
        Add Animal
      </button>
    </form>
  );
};

export default AnimalManagementForm;
