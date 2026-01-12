import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/logo.png"; // 👈 asegúrate de tener tu logo aquí

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
      
      const datosUsuario = await response.json();

      if (response.ok) {
       localStorage.setItem("usuario", JSON.stringify(datosUsuario.usuario));
       navigate("/home");
      } else {
        // Error: mostramos "Usuario no existe" o "Contraseña incorrecta"
        setError(datosUsuario.error || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <img src={logo} alt="Sabor logo" className="login-logo" />
        

        <h2>Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>
        {error && <p style={{ color: '#ff4d4d', fontWeight: 'bold' }}>{error}</p>}

        <p className="login-footer">
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/register")}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}
