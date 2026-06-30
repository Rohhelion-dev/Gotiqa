import api from "./api";

// Create animal
export const createAnimal = async (data) => {
  const res = await api.post("/animals", data);
  return res.data;
};

// Get animals (clean unwrapped data)
export const getAnimals = async () => {
  const res = await api.get("/animals");
  return res.data.data; // 👈 important fix
};
