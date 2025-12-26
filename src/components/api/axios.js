// src/api/axios.js
/*import axios from "axios";
const api = axios.create({
  baseURL: "https://reqres.in/api", // ou ton backend: "http://localhost:5000/api"
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres_a054589d15d14dfbaa184cffb7898043",
  },
});
// Intercepteur pour ajouter le token si tu utilises l’auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // adapte à ton storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Intercepteur de réponse (gestion globale des erreurs / 401, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // ex: rediriger vers /login ou nettoyer le storage
      // localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);
export default api;
*/
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
