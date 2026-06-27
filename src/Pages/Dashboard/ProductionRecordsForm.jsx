import React, { useState } from "react";
import axios from "axios";

const ProductionRecordsForm = () => {
  const [formData, setFormData] = useState({
    animal: "",
    productionType: "",
    quantity: "",
    unit: "",
    qualityGrade: "",
    notes: "",
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
        "http://localhost:5000/production-records",
        formData
      );

      console.log(response.data);

      alert("Production record saved successfully!");

      setFormData({
        animal: "",
        productionType: "",
        quantity: "",
        unit: "",
        qualityGrade: "",
        notes: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to save production record");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-10"
      >
        <div className="mb-8 border-b border-slate-200 pb-5">
          <h2 className="text-3xl font-bold text-slate-800">
            Production Records
          </h2>

          <p className="text-slate-500 mt-2">
            Record livestock production data for monitoring and reporting.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Animal Tag Number *
            </label>

            <input
              name="animal"
              value={formData.animal}
              onChange={handleChange}
              placeholder="GTQ-001"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Production Type *
            </label>

            <select
              name="productionType"
              value={formData.productionType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
            >
              <option value="">Select Type</option>
              <option value="milk">Milk</option>
              <option value="eggs">Eggs</option>
              <option value="meat">Meat</option>
              <option value="wool">Wool</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Quantity *
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="25"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
            />
          </div>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Unit
            </label>

            <input
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Litres / Kg"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Quality Grade
            </label>

            <select
              name="qualityGrade"
              value={formData.qualityGrade}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
            >
              <option value="">Select Grade</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>

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
            rows={5}
            placeholder="Additional production information..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Save Production Record
        </button>
      </form>
    </div>
  );
};

export default ProductionRecordsForm;