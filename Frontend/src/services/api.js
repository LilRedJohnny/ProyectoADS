const API_URL = "http://localhost:8080/api";

export const getProfile = (id) =>
  fetch(`${API_URL}/usuarios/${id}`).then(res => res.json());

export const saveIngredients = (id, ingredientes) =>
  fetch(`${API_URL}/ingredientes/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredientes })
  });
