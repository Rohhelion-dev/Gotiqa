import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin submitted health record:', formData);
  };

  return (
    <div>
      <h2>Health Records</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="animal"
          placeholder="Animal ID"
          value={formData.animal}
          onChange={handleChange}
        />

        <select
          name="healthStatus"
          value={formData.healthStatus}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="healthy">Healthy</option>
          <option value="sick">Sick</option>
          <option value="injured">Injured</option>
          <option value="recovering">Recovering</option>
        </select>

        <input
          type="number"
          name="temperature"
          placeholder="Temperature"
          value={formData.temperature}
          onChange={handleChange}
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
        />

        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
        />

        <textarea
          name="treatment"
          placeholder="Treatment"
          value={formData.treatment}
          onChange={handleChange}
        />

        <textarea
          name="vetNotes"
          placeholder="Veterinarian Notes"
          value={formData.vetNotes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Health Record
        </button>
      </form>
    </div>
  );
};

export default HealthRecordsForm;