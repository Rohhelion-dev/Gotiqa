import React, { useState } from "react";
import api from "../../api/api";


const BreedingRecordsForm = ({ user }) => {
  if (user?.role !== "admin") {
    return null;
  }

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
      const response = await api.post(
        "/breeding-records",
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
      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6"
    >

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Breeding Records
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Track reproduction cycles and livestock breeding data
        </p>
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

        {/* ANIMAL TAG */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Animal Tag
          </label>

          <input
            name="animalTag"
            placeholder="Animal Tag Number"
            value={formData.animalTag}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        {/* BREEDING DATE */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Breeding Date
          </label>

          <input
            type="date"
            name="breedingDate"
            value={formData.breedingDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        {/* MATING TYPE */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Mating Type
          </label>

          <select
            name="matingType"
            value={formData.matingType}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          >
            <option value="">Select type</option>
            <option value="Natural">Natural</option>
            <option value="Artificial Insemination">
              Artificial Insemination
            </option>
          </select>
        </div>

      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

        {/* SIRE TAG */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Sire Tag
          </label>

          <input
            name="sireTag"
            placeholder="Sire Tag"
            value={formData.sireTag}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        {/* EXPECTED DATE */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Expected Kidding Date
          </label>

          <input
            type="date"
            name="expectedKiddingDate"
            value={formData.expectedKiddingDate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

        {/* OFFSPRING COUNT */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Offspring Count
          </label>

          <input
            type="number"
            name="offspringCount"
            placeholder="Expected Count"
            value={formData.offspringCount}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>

      </div>

      {/* HEALTH */}
      <div className="mb-5">
        <label className="text-xs text-slate-500 mb-1 block">
          Offspring Health
        </label>

        <textarea
          name="offspringHealth"
          placeholder="Health status..."
          value={formData.offspringHealth}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white h-24 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
        />
      </div>

      {/* NOTES */}
      <div className="mb-6">
        <label className="text-xs text-slate-500 mb-1 block">
          Notes
        </label>

        <textarea
          name="notes"
          placeholder="Additional notes..."
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white h-24 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
        />
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-semibold hover:bg-emerald-800 hover:shadow-md transition"
        >
          Add Breeding Record
        </button>

      </div>

    </form>

  );

};

export default BreedingRecordsForm;