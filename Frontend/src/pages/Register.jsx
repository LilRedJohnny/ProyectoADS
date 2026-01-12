import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    edad: "",
    tipo: "",
    padecimientos: [],
    alergias: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e, field) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form}),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        // Guardamos el error que viene del backend
        setError(data.error || "Error al registrarse");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
    
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img src={logo} alt="logo" className="register-logo" />
        <h2>Crear cuenta</h2>

        <form onSubmit={handleRegister}>
          <input name="nombre" placeholder="Nombre completo" onChange={handleChange} required />
          <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <input type="number" name="edad" placeholder="Edad" onChange={handleChange} />

          <select name="tipo" onChange={handleChange}>
            <option value="">Tipo de alimentación</option>
            <option value="Ninguno">Ninguno</option>
            <option value="Vegetariano">Vegetariano</option>
            <option value="Vegano">Vegano</option>
          </select>

          <p className="checkbox-title">Padecimientos</p>
          <div className="checkbox-group">
            {["Diabetes", "Hipertensión", "Obesidad", "Ninguna"].map((p) => (
              <label key={p} className="checkbox-item">
                <input
                  type="checkbox"
                  value={p}
                  onChange={(e) => handleCheckbox(e, "padecimientos")}
                />
                <span>{p}</span>
              </label>
            ))}
          </div>

          <p className="checkbox-title">Alergias</p>
          <div className="checkbox-group">
            {["Ninguno" ,"Gluten", "Lácteos", "Mariscos", "Nueces", "Lacteos", "Trigo" ].map((a) => (
              <label key={a} className="checkbox-item">
                <input
                  type="checkbox"
                  value={a}
                  onChange={(e) => handleCheckbox(e, "alergias")}
                />
                <span>{a}</span>
              </label>
            ))}
          </div>

          <button type="submit">Registrarme</button>
        </form>
            {error && <p style={{ color: '#ff4d4d', fontWeight: 'bold' }}>{error}</p>}
        <p onClick={() => navigate("/")} className="register-footer">
          ¿Ya tienes cuenta? <span>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
}
