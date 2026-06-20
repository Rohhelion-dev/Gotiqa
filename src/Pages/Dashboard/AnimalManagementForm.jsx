import { useState } from 'react';

const AnimalManagementForm = () => {
  const [formData, setFormData] = useState({
    tagNumber: '', name: '', species: '', breed: '', age: '', gender: '', weight: '', notes: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    if (!formData.tagNumber.trim()) return 'Tag Number is required.';
    if (!formData.species) return 'Species is required.';
    if (!formData.gender) return 'Gender is required.';
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0)) {
      return 'Age must be a positive number.';
    }
    if (formData.weight && (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0)) {
      return 'Weight must be a positive number.';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitError('');

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      // Placeholder for API integration
      console.log('Admin submitted animal data:', formData);
      setSubmitStatus('success');
      setFormData({ tagNumber: '', name: '', species: '', breed: '', age: '', gender: '', weight: '', notes: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred while saving the animal record.';
      setSubmitError(message);
      setSubmitStatus('error');
      console.error('[AnimalManagementForm] Submission failed:', error);
    }
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

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700" role="alert">
          {submitError}
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700" role="status">
          Animal record saved successfully.
        </div>
      )}

      <button type="submit" className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800">
        Add Animal
      </button>
    </form>
  );
};

export default AnimalManagementForm;