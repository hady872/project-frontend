import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5240",
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------- Users APIs ----------
export const loginApi = async (email, passwordHash) => {
  // Backend expects: { email, passwordHash }
  const res = await api.post("/api/Users/login", {
    email,
    passwordHash,
  });

  // res.data = { message: "...", user: {...} }
  return res.data;
};

export default api;