import React, { useState } from 'react';
import axios from 'axios';

const FeedingRecordsForm = () => {
  const [formData, setFormData] = useState({
    animal: '',
    feedType: '',
    quantity: '',
    feedingDate: '',
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
        'http://localhost:5000/feeding-records',
        formData
      );

      console.log('Server Response:', response.data);

      alert('Feeding record saved successfully!');

      setFormData({
        animal: '',
        feedType: '',
        quantity: '',
        feedingDate: '',
        notes: '',
      });

    } catch (error) {
      console.error('Error saving feeding record:', error);
      alert('Failed to save feeding record');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Feeding Records
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

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
            placeholder="e.g An 34"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Feed Type *
          </label>

          <input
            type="text"
            name="feedType"
            required
            value={formData.feedType}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g Hay"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Quantity (kg) *
          </label>

          <input
            type="number"
            step="0.01"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g 2.50"
          />
        </div>

      </div>

      {/* Row 2 */}
      <div className="mb-4">

        <label className="block text-sm font-medium">
          Feeding Date & Time *
        </label>

        <input
          type="datetime-local"
          name="feedingDate"
          required
          value={formData.feedingDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
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
          placeholder="Additional feeding notes..."
        />

      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition-colors"
      >
        Add Feeding Record
      </button>
    </form>
  );
};

export default FeedingRecordsForm;