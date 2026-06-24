import React, { useState } from 'react';

const ProductionRecordsForm = () => {
  const [formData, setFormData] = useState({
    animal: '',
    productionType: '',
    quantity: '',
    unit: '',
    qualityGrade: '',
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
    console.log('Admin submitted production record:', formData);
  };

  return (
    <div>
      <h2>Production Records</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="animal"
          placeholder="Animal ID"
          value={formData.animal}
          onChange={handleChange}
        />

        <select
          name="productionType"
          value={formData.productionType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="milk">Milk</option>
          <option value="eggs">Eggs</option>
          <option value="meat">Meat</option>
          <option value="wool">Wool</option>
        </select>

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

        <select
          name="qualityGrade"
          value={formData.qualityGrade}
          onChange={handleChange}
        >
          <option value="">Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Production Record
        </button>
      </form>
    </div>
  );
};

export default ProductionRecordsForm;