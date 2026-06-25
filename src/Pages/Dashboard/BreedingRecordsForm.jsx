import React, { useState } from "react";
import axios from "axios";

const BreedingRecordsForm = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    breedingDate: "",
    matingType: "",
    sireTag: "",
    expectedKiddingDate: "",
    offspringCount: "",
    offspringHealth: "",
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
        "http://localhost:5000/breeding-records",
        formData
      );

      console.log(response.data);

      alert("Breeding record saved successfully!");

      setFormData({
        animalTag: "",
        breedingDate: "",
        matingType: "",
        sireTag: "",
        expectedKiddingDate: "",
        offspringCount: "",
        offspringHealth: "",
        notes: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to save breeding record");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-6">
        Breeding Records
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

        <input
          name="animalTag"
          placeholder="Animal Tag Number"
          value={formData.animalTag}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="breedingDate"
          value={formData.breedingDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="matingType"
          value={formData.matingType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Mating Type</option>
          <option value="Natural">Natural</option>
          <option value="Artificial Insemination">
            Artificial Insemination
          </option>
        </select>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

        <input
          name="sireTag"
          placeholder="Sire Tag"
          value={formData.sireTag}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="expectedKiddingDate"
          value={formData.expectedKiddingDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="offspringCount"
          placeholder="Expected Offspring Count"
          value={formData.offspringCount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

      </div>

      <textarea
        name="offspringHealth"
        placeholder="Offspring Health"
        value={formData.offspringHealth}
        onChange={handleChange}
        className="w-full p-2 border rounded h-24 mb-4"
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded h-24 mb-6"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
      >
        Add Breeding Record
      </button>
    </form>
  );
};

export default BreedingRecordsForm;