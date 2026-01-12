import React, { useState } from "react";
import { Heart, Menu } from "lucide-react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [filtroTiempo, setFiltroTiempo] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const[vista,setVista]=useState("Normal");
  const [menuOpen, setMenuOpen] = useState(false);
 const [recetas, setRecetas] = useState([]);
  
  const minutos = (t) => parseInt(t);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario = usuario?.id_usuario;
  const nombre_usuario =usuario?.nombre_usuario;
  
  const cargarFavorito= async ()=> {
    setError("");
    try{
      const response = await fetch(`/api/favoritos/${id_usuario}`);
      const data= await response.json();

      if(response.ok){
        if(vista==="Favoritos"){
          setRecetas(data.data);
        }
        
        setFavoritos(data.data);          
      }
      else{

      }

    }catch(error){


    }

  }
  const guardarFavorito = async (id_receta) => {
  try {
    const res = await fetch('/api/favoritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_usuario: usuario.id_usuario, // desde tu auth/context
        id_receta
      })
    });

    const data = await res.json();

    if (res.ok) {
      
      cargarFavorito();      
      alert(data.message);
      return;
    }

    
  } catch (error) {
    console.error(error);
  }
};
  const verFavoritos= async ()=>{
    setError("");
    
    try{
      const response = await fetch(`/api/favoritos/${id_usuario}`);
      const data= await response.json();


      if(response.ok){
        if(vista === "Normal"){
            setRecetas(data.data);
            setVista("Favoritos");
        }
        else{
          setVista("Normal");
          cargarRecetas();
        }
        
      }
      else{
        setRecetas([]);
      }

    }catch(error){
      throw new Error("Error al conectar con servidor");
    }


  }
  const buscarRecetas= async ()=>{
    setError("");
    try{
      const params = new URLSearchParams({
       id_usuario,
       busqueda,
       filtro,
       filtroTiempo
    });

    const response = await fetch(`/api/recetas/buscar?${params.toString()}`);
    const data = await response.json();
       if (response.ok) {
        if(data.data.length === 0){ //vacio las recetas
          if(busqueda){ //osea el usuario genuinamente busco algo
              setRecetas([]);
              setVista("Busqueda");
          }
          else{
              setVista("Normal");
              cargarRecetas();       
          }
        }
        else{
          setRecetas(data.data);
        }
        
      
    }
    else{
      throw new Error("Error buscar recetas");
    }

    }catch(error){
      throw new Error("Error al cargar recetas");
    }
  }


 const cargarRecetas = async () => {
  setError("");

  try {
    const response = await fetch("/api/recetas/cargarRecetas");
    const data = await response.json();

    if (response.ok) {
      setRecetas(data);
      
    }
    else{
      throw new Error("Error al cargar recetas");
    }

    
  } catch (err) {
    console.error(err);
    setError("Error al conectar con el servidor");
  }
};

useEffect(() => {
  cargarRecetas();
  cargarFavorito();
}, []);

useEffect(() => {
  buscarRecetas();
}, [filtro, filtroTiempo]);

useEffect(() => {
  console.log("RECETAS EN STATE:", recetas);
}, [recetas]);


  return (
    <div className="home-container">
      {/* 🔸 Header */}
      <header className="home-header">
        <button
         className={`icon-btn ${vista === "Favoritos" ? "active" : ""}`}
        onClick={verFavoritos}
        >
        ❤️ Favoritos
        </button>

        <h1 className="logo">Sabor A Ti</h1>

        <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={26} />
        </button>

        {menuOpen && (
  <div className="menu-dropdown">
    <p onClick={() => navigate("/profile")}>👤 Perfil</p>

    <p onClick={() => navigate("/history")}>📜 Historial</p>

    <p
      onClick={() => {
        localStorage.clear();
        navigate("/");
      }}
    >
      🚪 Cerrar sesión
    </p>
  </div>
)}



      </header>
      
  <div className="search-container">
    <input
      type="text"
      placeholder="Buscar recetas..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />

    <button className="search-btn" onClick={buscarRecetas}>
      <FaSearch />
    </button>
  </div>    

      {/* 🔸 Filtros categoría */}
      <div className="filters">
        {["Todos", "Entrada", "Plato Fuerte", "Postre"].map((cat) => (
          <button
            key={cat}
            className={filtro === cat ? "active" : ""}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔸 Filtros tiempo */}
      <div className="filters-time">
        {[
          { label: "Menos de 15 min", value: "Menos de 15" },
          { label: "15-30 min", value: "15-30" },
          { label: "30-60 min", value: "30-60" },
          { label: "Más de 60 min", value: "Más de 60" },
        ].map((t) => (
          <button
            key={t.value}
            className={filtroTiempo === t.value ? "active" : ""}
            onClick={() =>
            setFiltroTiempo((prev) => (prev === t.value ? null : t.value))
}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 🔸 Recetas */}
      <div className="recipes">
        {recetas.map((receta) => (
          <div key={receta.id_receta} className="recipe-card">
            <img src={receta.imagen_url} alt={receta.titulo} />

            <button
              className={`fav-btn ${
            favoritos.some(fav => String(fav.id_receta) === String(receta.id_receta))
 ? "active" : ""
            }`}
              onClick={() => guardarFavorito(receta.id_receta)}
            >
              <Heart size={20} />
            </button>

            <div className="recipe-content">
              <h3>{receta.titulo}</h3>
              <p>{receta.Descripcion}</p>

              <div className="recipe-footer">
                <span className="tag">{receta.Categoria}</span>
                <span className="time">⏱ {receta.Tiempo}</span>
              </div>

              <button className="view-btn" onClick={() => navigate(`/recipe/${receta.id_receta}`)} >
                 Ver receta
                </button>

            </div>
          </div>
          
        ))}
        
        {vista === "Busqueda" && recetas.length === 0 && (
  <div className="empty-state">
    <span className="empty-icon">🔍</span>
    <p>No se encontró ninguna receta</p>
    <small>Intenta con otro nombre o cambia los filtros</small>
  </div>
)}
        {vista === "Favoritos" && recetas.length === 0 && (
  <div className="empty-state">
    <span className="empty-icon">❤️</span>
    <p>No tienes recetas favoritas</p>
    <small>Guarda tus recetas favoritas para verlas aquí</small>
  </div>
)}

      </div>
    </div>
    
  );
}
