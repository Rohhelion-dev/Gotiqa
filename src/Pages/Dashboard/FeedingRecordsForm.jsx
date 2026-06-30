import axios from "axios";
import React, { useState } from 'react';
import api from "../../api/api";


const FeedingRecordsForm = ({ user }) => {
  if (user?.role !== "admin") {
    return null;
  }
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
      className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm p-8"
    >

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Feeding Records
        </h2>

        <p className="text-slate-500 mt-1">
          Record livestock feeding schedules and nutrition details.
        </p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

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
            placeholder="e.g. AN-034"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Feed Type *
          </label>

          <input
            type="text"
            name="feedType"
            required
            value={formData.feedType}
            onChange={handleChange}
            placeholder="e.g. Hay"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Quantity (kg) *
          </label>

          <input
            type="number"
            step="0.01"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 2.50"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

      </div>

      {/* Row 2 */}

      <div className="mb-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Feeding Date & Time *
        </label>

        <input
          type="datetime-local"
          name="feedingDate"
          required
          value={formData.feedingDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
        />

      </div>

      {/* Notes */}

      <div className="mb-8">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional feeding notes..."
          rows="5"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
        />

      </div>

      {/* Footer */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="inline-flex items-center rounded-xl bg-emerald-900 px-8 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800 hover:shadow-md transition-all duration-200"
        >
          Save Feeding Record
        </button>

      </div>

    </form>
  );
};

export default FeedingRecordsForm;