import React, { useState } from 'react';

const BreedingRecordsForm = () => {
  const [formData, setFormData] = useState({
    animal: '',
    dateOfBreeding: '',
    partnerTag: '',
    expectedDelivery: '',
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
  };

  return (
    <div>
      <h2>Breeding Records</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="animal"
          placeholder="Animal ID"
          value={formData.animal}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="dateOfBreeding"
          value={formData.dateOfBreeding}
          onChange={handleChange}
        />

        <input
          name="partnerTag"
          placeholder="Partner Tag"
          value={formData.partnerTag}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="expectedDelivery"
          value={formData.expectedDelivery}
          onChange={handleChange}
        />

        <input
          type="number"
          name="offspringCount"
          placeholder="Offspring Count"
          value={formData.offspringCount}
          onChange={handleChange}
        />

        <textarea
          name="offspringHealth"
          placeholder="Offspring Health"
          value={formData.offspringHealth}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Breeding Record
        </button>
      </form>
    </div>
  );
};

export default BreedingRecordsForm;