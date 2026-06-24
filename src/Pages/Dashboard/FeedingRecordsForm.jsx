import React, { useState } from 'react';

const FeedingRecordsForm = () => {
  const [formData, setFormData] = useState({
    animal: '',
    feedType: '',
    quantity: '',
    unit: '',
    cost: '',
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
    console.log('Admin submitted feeding record:', formData);
  };

  return (
    <div>
      <h2>Feeding Records</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="animal"
          placeholder="Animal ID"
          value={formData.animal}
          onChange={handleChange}
        />

        <input
          name="feedType"
          placeholder="Feed Type"
          value={formData.feedType}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
        />

        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Feeding Record
        </button>
      </form>
    </div>
  );
};

export default FeedingRecordsForm;