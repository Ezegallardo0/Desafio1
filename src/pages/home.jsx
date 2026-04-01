import React from "react";
import "../styles/home.css";
import { Link } from "react-router";
import Historial from "../components/historial";

function Home({ productos, historial }) {
  const totalStock = productos.reduce((acc, p) => acc + p.stock, 0);
  const stockBajo = productos.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const stockAgotado = productos.filter((p) => p.stock === 0).length;
  const totalDinero = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);

  return (
    <>
      <div className="cards">
        <div className="produ ">
          <Link className="link" to="/producto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0e8814"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="ico lucide lucide-package-icon lucide-package"
            >
              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
              <path d="M12 22V12" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <path d="m7.5 4.27 9 5.15" />
            </svg>
            <div className="info">
              <h3>Productos en Stock</h3>
              <p>Stock Total: {totalStock}</p>
            </div>
          </Link>
        </div>
        <div className="produ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="repico lucide lucide-shield-alert-icon lucide-shield-alert"
          >
            <path
              d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
              fill="red"
              stroke="red"
            />
            <path d="M12 8v4" fill="white" stroke="white" />
            <path d="M12 16h.01" fill="white" stroke="white" />
          </svg>
          <div className="info">
            <h3>Stock Bajo</h3>
            <p>Productos con Bajo Stock: {stockBajo}</p>
          </div>
          <Link to="/reponer/stock-bajo">
            <div className="reponer">
              <button className="repo">
                <h4>Reponer</h4>
              </button>
            </div>
          </Link>
        </div>
        <div className="produ ">
          <Link  className="link" to="/reponer/agotado">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef803b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="ico lucide lucide-package-open-icon lucide-package-open"
            >
              <path d="M12 22v-9" />
              <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
              <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
              <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
            </svg>
            <div className="info">
              <h3>Productos Agotados</h3>
              <p>Productos sin Stock: {stockAgotado}</p>
            </div>
          </Link>
        </div>

        <div className="produ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#08782c"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="repico lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
          </svg>
          <div className="info">
            <h3>Valor Total de Inventario</h3>
            <p>${totalDinero.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>
      <div className="histo">
        <Historial historial={historial} productos={productos} />
      </div>
    </>
  );
}

export default Home;
