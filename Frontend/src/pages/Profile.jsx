import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ALL_Padecimientos = ["Diabetes", "Hipertensión", "Obesidad"];
const ALL_Alergias = ["Gluten", "Lácteos", "Mariscos", "Nueces", "Trigo"];

export default function Profile() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("usuario")) || {};

  const parseChecklist = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      return data
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "Ninguna");
    }
    return [];
  };

  return {
    id: saved.id_usuario,
    nombre: saved.nombre_usuario || "",
    correo: saved.correo || "",
    edad: saved.edad || "",
    tipo: saved.tipo_alimentacion|| "Ninguno",
    padecimientos: parseChecklist(saved.Padecimientos),
    alergias: parseChecklist(saved.Alergias),
  };
});

  /* ======================
     CARGAR USUARIO
  ====================== */
  

  /* ======================
     TOGGLE CHECKBOX
  ====================== */
  const toggleItem = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  /* ======================
     GUARDAR PERFIL
  ====================== */
  const guardar = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/actualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), // 👈 USUARIO PLANO
      });

      const usuarioActualizado = await response.json();

      if (!response.ok) {
        throw new Error(usuarioActualizado.error || "Error al guardar");
      }

      // 🔥 Actualizamos localStorage CONSISTENTE
      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioActualizado)
      );

      alert("Perfil guardado correctamente");
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor");
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="perfil-container">
      <ArrowLeft
        size={28}
        className="back-arrow"
        onClick={() => navigate("/home")}
      />

      <h2>Mi perfil</h2>

      <div className="profile-card">
        <input value={user.nombre} disabled />
        <input value={user.correo} disabled />
        <input value={user.edad} disabled />

        <select
          value={user.tipo}
          onChange={(e) => setUser({ ...user, tipo: e.target.value })}
        >
          <option>Ninguno</option>
          <option>Vegetariano</option>
          <option>Vegano</option>
        </select>

        <p className="section-title">Padecimientos</p>
        <div className="checkbox-group">
          {ALL_Padecimientos.map((p) => (
            <label key={p} className="checkbox-item">
              <input
                type="checkbox"
                checked={user.padecimientos.includes(p)}
                onChange={() => toggleItem("padecimientos", p)}
              />
              <span>{p}</span>
            </label>
          ))}
        </div>

        <p className="section-title">Alergias</p>
        <div className="checkbox-group">
          {ALL_Alergias.map((a) => (
            <label key={a} className="checkbox-item">
              <input
                type="checkbox"
                checked={user.alergias.includes(a)}
                onChange={() => toggleItem("alergias", a)}
              />
              <span>{a}</span>
            </label>
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}

        <button onClick={guardar}>Guardar cambios</button>
      </div>
    </div>
  );
}
