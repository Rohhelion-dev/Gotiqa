import React, { useEffect, useState } from "react";
import api from "../../api/api";


const API_URL = import.meta.env.VITE_API_URL ;

export default function AnimalsView() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalDetails, setAnimalDetails] = useState(null);
  const [loadingAnimals, setLoadingAnimals] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

  const fetchAnimals = async (searchValue = "") => {
    try {
      setLoadingAnimals(true);
      setError("");

          const response = await api.get(`/animals`, {
  params: searchValue ? { search: searchValue } : {},
});

const foundAnimals = response.data.data || [];
setAnimals(foundAnimals);

if (searchValue && foundAnimals.length === 1) {
  fetchAnimalDetails(foundAnimals[0]);
}
    } catch (err) {
      console.error(err);
      setError("Failed to load animals");
    } finally {
      setLoadingAnimals(false);
    }
  };

  const fetchAnimalDetails = async (animal) => {
    try {
      setSelectedAnimal(animal);
      setAnimalDetails(null);
      setLoadingDetails(true);
      setError("");

      const response = await api.get(`/animals/${animal.id}/details`);

      setAnimalDetails(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load animal details");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnimals(search);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Animals</h2>
            <p className="mt-1 text-sm text-slate-500">
              View all animals, search by tag/name/species/breed/gender, and open full records.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full gap-2 md:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search animals..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 md:w-72"
            />

            <button
              type="submit"
              className="rounded-xl bg-emerald-900 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                fetchAnimals("");
              }}
              className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              All
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-1">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Farm Animals
          </h3>

          {loadingAnimals ? (
            <p className="text-sm text-slate-500">Loading animals...</p>
          ) : animals.length === 0 ? (
            <p className="text-sm text-slate-500">No animals found.</p>
          ) : (
            <div className="space-y-3">
              {animals.map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => fetchAnimalDetails(animal)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selectedAnimal?.id === animal.id
                      ? "border-emerald-700 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">
                      {animal.tag_number}
                    </p>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {animal.gender || "Unknown"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    {animal.name || "Unnamed"} · {animal.species || "No species"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {animal.breed || "No breed"} {animal.weight ? `· ${animal.weight} kg` : ""}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          {!selectedAnimal && (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm text-slate-500">
                Select an animal to view full details.
              </p>
            </div>
          )}

          {selectedAnimal && loadingDetails && (
            <p className="text-sm text-slate-500">Loading animal details...</p>
          )}

          {animalDetails && !loadingDetails && (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold text-slate-900">
                  {animalDetails.animal.tag_number} · {animalDetails.animal.name || "Unnamed Animal"}
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <InfoCard label="Species" value={animalDetails.animal.species} />
                  <InfoCard label="Breed" value={animalDetails.animal.breed} />
                  <InfoCard label="Gender" value={animalDetails.animal.gender} />
                  <InfoCard label="Age" value={animalDetails.animal.age} />
                  <InfoCard label="Weight" value={animalDetails.animal.weight ? `${animalDetails.animal.weight} kg` : ""} />
                  <InfoCard label="Tag Number" value={animalDetails.animal.tag_number} />
                </div>

                {animalDetails.animal.notes && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Notes
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {animalDetails.animal.notes}
                    </p>
                  </div>
                )}
              </section>

              <RecordsSection
                title="Health Records"
                records={animalDetails.healthRecords}
                columns={["record_date", "health_status", "diagnosis", "treatment", "veterinarian"]}
              />

              <RecordsSection
                title="Feeding Records"
                records={animalDetails.feedingRecords}
                columns={["feeding_date", "feed_type", "quantity", "notes"]}
              />

              <RecordsSection
                title="Breeding Records"
                records={animalDetails.breedingRecords}
                columns={["breeding_date", "partner_tag", "mating_type", "expected_delivery", "offspring_count"]}
              />

              <RecordsSection
                title="Production Records"
                records={animalDetails.productionRecords}
                columns={["production_date", "production_type", "quantity", "unit", "notes"]}
              />

              <RecordsSection
                title="Activity Logs"
                records={animalDetails.activityLogs}
                columns={["activity_date", "activity_type", "description"]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-900">
        {value || "Not set"}
      </p>
    </div>
  );
}

function RecordsSection({ title, records, columns }) {
  return (
    <section className="rounded-2xl border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <h4 className="font-semibold text-slate-900">
          {title}
        </h4>
      </div>

      {!records || records.length === 0 ? (
        <p className="px-4 py-4 text-sm text-slate-500">
          No records found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-white text-xs uppercase text-slate-500">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3">
                    {column.replaceAll("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column} className="px-4 py-3 text-slate-700">
                      {record[column] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}