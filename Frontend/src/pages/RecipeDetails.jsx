import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/recipeDetails.css";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receta, setReceta] = useState(null);
  const [error, setError] = useState("");
  const[id_receta,setId_receta]=useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  const id_usuario = usuario.id_usuario;
  
  const alergiasUsuario = Array.isArray(usuario.alergias)
    ? usuario.alergias.map(a => a.toLowerCase())
    : [];

  useEffect(() => {
    const cargarReceta = async () => {
      try {
        const response = await fetch(`/api/recetas/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al cargar receta");
        }

        console.log("RECETA RECIBIDA:", data);
        setReceta(data);
        setId_receta(data.id_receta);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la receta");
      }
    };

    cargarReceta();
  }, [id]);
  const guardarHistorial= async() =>{
    setError("");
    try{
       const response = await fetch("/api/recetas/guardarReceta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario, id_receta }),
      });
      
      const data =await response.json();

      alert(data.message);

    }catch(error){
      setError("Error al cargar con el servidor");
    }


  }
  if (error) return <p>{error}</p>;
  if (!receta) return <p>Cargando receta...</p>;

  // 🔥 PROTECCIÓN TOTAL
  const ingredientes = Array.isArray(receta.Ingredientes)
    ? receta.Ingredientes
    : [];

  const alergiasDetectadas = ingredientes.filter((ing) =>
    alergiasUsuario.some((a) =>
      ing.Nombre?.toLowerCase().includes(a)
    )
  );

  return (
    <div className="recipe-details">
      <ArrowLeft
        size={26}
        className="back-btn"
        onClick={() => navigate("/home")}
      />

      <img
        src={receta.imagen_url || "/placeholder.jpg"}
        alt={receta.titulo}
        className="detail-img"
      />

      <h1>{receta.titulo}</h1>
      <p className="time">⏱ {receta.Tiempo} min</p>
      <p className="description">{receta.Descripcion}</p>

      {alergiasDetectadas.length > 0 && (
        <div className="alert-box">
          <AlertTriangle size={22} />
          <div>
            <strong>Advertencia</strong>
            <p>
              Esta receta contiene ingredientes relacionados con tus alergias:{" "}
              <span>
                {alergiasDetectadas.map(a => a.Nombre).join(", ")}
              </span>
            </p>
          </div>
        </div>
      )}

      <h3>Ingredientes</h3>
      <ul>
        {ingredientes.map((ing) => (
          <li className="ingredient-item" key={ing.id_ingrediente}>
  <span className="ingredient-name">{ing.Nombre}</span>

  {ing.IngredienteReceta && (
    <span className="ingredient-amount">
      {ing.IngredienteReceta.Cantidad} {ing.IngredienteReceta.Unidad}
    </span>
  )}
</li>


        ))}
      </ul>

      <h3>Utensilios</h3>
      <p>{receta.Utensilios}</p>

      <h3>Preparación</h3>
      <p>{receta.Instrucciones}</p>

      <button className="complete-btn" onClick={guardarHistorial}>Terminé la receta</button>
    </div>
  );
}
