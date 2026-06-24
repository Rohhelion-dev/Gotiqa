import React, { useState } from 'react';
import axios from "axios";

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
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Production Records
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <input
          name="animal"
          placeholder="Animal"
          value={formData.animal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="productionType"
          value={formData.productionType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Production Type</option>
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
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <input
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="qualityGrade"
          value={formData.qualityGrade}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Quality Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded h-24 mb-6"
        placeholder="Notes"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
      >
        Add Production Record
      </button>
    </form>
  );
};

export default ProductionRecordsForm;