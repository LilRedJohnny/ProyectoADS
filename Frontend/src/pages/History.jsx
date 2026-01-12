import { useNavigate } from "react-router-dom";
import "../styles/history.css";
import { useEffect,useState } from "react";
export default function History() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario=usuario.id_usuario;
  const[historial,setHistorial]=useState([]);
  const[error,setError]=useState([]);
  const cargarHistorial= async ()=>{
    setError('');
    try{

      const response = await fetch(`/api/recetas/historial/${id_usuario}`);

      const data= await response.json();
      if(response.ok){
        setHistorial(data.historial);
      }
      else{
        setHistorial([]);

      }


    }catch(error){
      
    }


  }
  useEffect(() => {
    cargarHistorial();
    
  }, []);
  return (
    <div className="history">
      <button className="back-btn" onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>Historial</h2>

      {historial.length === 0 && (
        <p className="history-empty">No hay recetas completadas</p>
      )}

     {historial.map((item) => (
  <div key={item.id_historial} className="history-card">
    <img
      src={item.Recetum.imagen_url}
      alt={item.Recetum.titulo}
      className="history-img"
    />

    <div className="history-content">
      <strong className="history-title">
        {item.Recetum.titulo}
      </strong>

      <span className="history-date">
        {new Date(item.fecha_preparacion).toLocaleDateString()}
      </span>

      <button
        className="history-btn"
        onClick={() =>
          navigate(`/recipe/${item.Recetum.id_receta}`)
        }
      >
        Ver receta
      </button>
    </div>
  </div>
))}


    </div>
  );
}
