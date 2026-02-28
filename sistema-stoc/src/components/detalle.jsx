import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import '../styles/detalle.css'

function DetalleProducto(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    const API = "https://699c9cb4110b5b738cc33411.mockapi.io/products";
    console.log("ID recibido:", id);

    useEffect(()=>{
        fetch(`${API}/${id}`)
            .then(res => {
                console.log("Status:", res.status)
                return res.json();
            })
            .then(data => {
                console.log("DATA:", data);
                setProducto(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("ERRORL", err);
                setLoading(false);
            });
    },[id]);

    if(loading)return (
        <div className="typing-wrapper">
            <div className="typing-indicator">
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>

                <div className="typing-shadow"></div>
                <div className="typing-shadow"></div>
                <div className="typing-shadow"></div>
            </div>
        </div>)
    if(!producto) return <p>Producto no encontrado.</p>

    return (
    <div className="detalle-container">
  <div className="detalle-card">
    <h2 className="detalle-title">{producto.nombre}</h2>
    <p className="detalle-sku">SKU: {producto.sku}</p>

    <p className="detalle-stock">
      Stock actual: <strong>{producto.stock}</strong>
    </p>

    <p className="detalle-precio">
      Precio: ${producto.precio}
    </p>

    <div className="detalle-section">
      <h3>Historial de movimientos</h3>

      {producto.historial.length === 0 ? (
        <p>No hay movimientos todavía</p>
      ) : (
        <ul className="historial-list">
          {producto.historial.map((mov, index) => (
            <li
              key={index}
              className={`historial-item ${mov.tipo}`}
            >
              <span>
                {mov.tipo.toUpperCase()} - {mov.cantidad} unidades
              </span>
              <span>{mov.fecha}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    <button
      className="volver-btn"
      onClick={() => navigate("/")}
    >
      Volver
    </button>
  </div>
</div>
  );
}

export default DetalleProducto;