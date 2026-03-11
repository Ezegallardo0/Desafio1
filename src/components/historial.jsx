import React from "react";
import "../styles/historial.css";

function Historial({ historial, productos }) {
  return (
    <div className="historial-section">
      <h3>Movimientos Recientes</h3>

      <div className="scroll">
        <ul className="movimientos-list">
          <li className="movimiento header">
            <span>Fecha</span>
            <span>Tipo</span>
            <span>Producto</span>
            <span>Cantidad</span>
          </li>

          {historial
            ?.slice()
            .reverse()
            .map((mov) => {
              const producto = productos?.find((p) => p.id === mov.productoId);

              return (
                <li key={mov.id} className={`movimiento ${mov.tipo}`}>
                  <span className="fecha">
                    {new Date(mov.fecha).toLocaleDateString("es-AR")}
                  </span>

                  <span className={`tipo ${mov.tipo}`}>
                    {mov.tipo === "entrada" ? "Entrada" : "Salida"}
                  </span>

                  <span className="descripcion">{producto?.nombre}</span>

                  <span className="cantidad">{mov.cantidad}</span>
                </li>
              );
            })}
        </ul>
      </div>

      <button className="ver-movimientos">Ver Todos los Movimientos</button>
    </div>
  );
}

export default Historial;
